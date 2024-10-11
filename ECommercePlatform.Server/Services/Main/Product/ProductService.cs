using ECommercePlatform.Server.Data;
using ECommercePlatform.Server.DTOs.Product;
using ECommercePlatform.Server.Entities.Main;
using ECommercePlatform.Server.Helpers.ImageHelper;
using ECommercePlatform.Server.Services.Base.Crud;
using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Server.Services.Main.Product
{
    public class ProductService : CrudService<Entities.Main.Product>, IProductService
    {
        private readonly ApplicationDBContext _context;
        private readonly ImageHelperService _imageHelper;

        public ProductService(ApplicationDBContext context, ImageHelperService imageHelper) : base(context)
        {
            _context = context;
            _imageHelper = imageHelper;
        }

        public async Task<int> InsertAsync(ProductDTO productDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var product = new Entities.Main.Product
                {
                    Code = productDto.Code,
                    EnglishName = productDto.Name,
                    Description = productDto.Description,
                    Price = productDto.Price,
                    Discount1Price = productDto.Discount1Price,
                    StockQuantity = productDto.StockQuantity,
                    IsActive = true,
                    CategoryID = productDto.CategoryID,
                    SubCategoryID = productDto.SubCategoryID,
                    ProductImages = []
                };

                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();

                if (productDto.Images != null && productDto.Images.Any())
                {
                    for (int i = 0; i < productDto.Images.Count; i++)
                    {
                        var imageDto = productDto.Images[i];
                        string imagePath = await _imageHelper.AddImage(imageDto.ImageFile, "products");
                        var productImage = new ProductImage
                        {
                            ProductID = product.ID,
                            ImageUrl = imagePath,
                            IsMain = imageDto.IsMain || (i == 0 && !productDto.Images.Any(img => img.IsMain))
                        };
                        product.ProductImages.Add(productImage);
                    }
                    await _context.SaveChangesAsync();
                }

                await transaction.CommitAsync();
                return product.ID;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        public async Task<int> UpdateAsync(ProductDTO productDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var product = await _context.Products
                    .Include(p => p.ProductImages)
                    .FirstOrDefaultAsync(p => p.ID == productDto.ID);

                if (product == null)
                {
                   return 0;
                }

                product.Code = productDto.Code;
                product.EnglishName = productDto.Name;
                product.Description = productDto.Description;
                product.Price = productDto.Price;
                product.Discount1Price = productDto.Discount1Price;
                product.StockQuantity = productDto.StockQuantity;
                product.CategoryID = productDto.CategoryID;
                product.SubCategoryID = productDto.SubCategoryID;

                foreach (var imageDto in productDto.Images)
                {
                    if (imageDto.ID.HasValue)
                    {
                        var existingImage = product.ProductImages!.FirstOrDefault(pi => pi.ID == imageDto.ID);
                        if (existingImage != null)
                        {
                            if (imageDto.IsDeleted)
                            {
                                await _imageHelper.DeleteImage(existingImage.ImageUrl!);
                                product.ProductImages!.Remove(existingImage);
                            }
                            else
                            {
                                existingImage.IsMain = imageDto.IsMain;
                            }
                        }
                    }
                    else if (imageDto.ImageFile != null)
                    {
                        string imagePath = await _imageHelper.AddImage(imageDto.ImageFile, "products");
                        var newImage = new ProductImage
                        {
                            ProductID = product.ID,
                            ImageUrl = imagePath,
                            IsMain = imageDto.IsMain
                        };
                        product.ProductImages!.Add(newImage);
                    }
                }

                if (!product.ProductImages!.Any(pi => pi.IsMain))
                {
                    var firstImage = product.ProductImages!.FirstOrDefault();
                    if (firstImage != null)
                    {
                        firstImage.IsMain = true;
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return product.ID;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        public async Task<bool> DeleteAsync(int productId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var product = await _context.Products
                    .Include(p => p.ProductImages)
                    .FirstOrDefaultAsync(p => p.ID == productId);

                if (product == null)
                {
                    return false; 
                }

                if (product.ProductImages != null)
                {
                    foreach (var image in product.ProductImages)
                    {
                        if (!string.IsNullOrEmpty(image.ImageUrl))
                        {
                            await _imageHelper.DeleteImage(image.ImageUrl);
                        }
                    }
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
