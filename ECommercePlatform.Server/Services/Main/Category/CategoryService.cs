using ECommercePlatform.Server.Data;
using ECommercePlatform.Server.DTOs.Category;
using ECommercePlatform.Server.Helpers.ImageHelper;
using ECommercePlatform.Server.Services.Base.Crud;
using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Server.Services.Main.Category
{
    public class CategoryService : CrudService<Entities.Main.Category>, ICategoryService
    {
        private readonly ApplicationDBContext _context;
        private readonly ImageHelperService _imageHelper;

        public CategoryService(ApplicationDBContext context, ImageHelperService imageHelper) : base(context)
        {
            _context = context;
            _imageHelper = imageHelper;
        }

        public async Task<int> InsertAsync(CategoryDTO categoryDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var category = new Entities.Main.Category
                {
                    EnlgishName = categoryDto.Name
                };

                if (categoryDto.ImageFile != null)
                {
                    category.ImageUrl = await _imageHelper.AddImage(categoryDto.ImageFile, "categories");
                }

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return category.ID;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> UpdateAsync(CategoryDTO categoryDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var category = await _context.Categories.FindAsync(categoryDto.ID);

                if (category == null)
                {
                    return false;
                }

                category.EnlgishName = categoryDto.Name;

                if (categoryDto.ImageFile != null)
                {
                    if (!string.IsNullOrEmpty(category.ImageUrl))
                    {
                        await _imageHelper.DeleteImage(category.ImageUrl);
                    }
                    category.ImageUrl = await _imageHelper.AddImage(categoryDto.ImageFile, "categories");
                }

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
