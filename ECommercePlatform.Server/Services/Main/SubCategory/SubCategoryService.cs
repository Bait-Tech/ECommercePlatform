using ECommercePlatform.Server.Data;
using ECommercePlatform.Server.Extensions.pagination;
using ECommercePlatform.Server.Helpers.ImageHelper;
using ECommercePlatform.Server.Services.Base.Crud;
using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Server.Services.Main.SubCategory
{
    public class SubCategoryService : CrudService<Entities.Main.SubCategory>, ISubCategoryService
    {
        private readonly ApplicationDBContext _context;
        private readonly ImageHelperService _imageHelper;

        public SubCategoryService(ApplicationDBContext context, ImageHelperService imageHelper) : base(context)
        {
            _context = context;
            _imageHelper = imageHelper;
        }

        public async override Task<PaginatedResult<Entities.Main.SubCategory>> GetAllPagedAsync(PaginationParams paginationParams)
        {
            var query = _context
                .SubCategories
                .AsNoTracking()
                .Include(sc => sc.Category);

            return await query.ToPaginatedListAsync(paginationParams);
        }

        public async Task<List<Entities.Main.SubCategory>> GetByCategoryId(int categoryID)
        {
            return await _context.SubCategories
                .Where(sc => sc.CategoryID == categoryID)
                .ToListAsync();
        }

        public override async Task<int> AddAsync(Entities.Main.SubCategory entity)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var insertedSubCategory = new Entities.Main.SubCategory
                {
                    EnglishName = entity.EnglishName,
                    ArabicName = entity.ArabicName,
                    CategoryID = entity.CategoryID,
                };


                if (entity.ImageFile != null)
                {
                    insertedSubCategory.ImageUrl = await _imageHelper.AddImage(entity.ImageFile, "sub-categories");
                }

                await _context.SubCategories.AddAsync(insertedSubCategory);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return insertedSubCategory.ID;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public override async Task UpdateAsync(Entities.Main.SubCategory entity)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var existSubCategory = await _context.SubCategories.FindAsync(entity.ID);

                if (existSubCategory == null)
                {
                    return;
                }

                existSubCategory.EnglishName = entity.EnglishName;

                if (entity.ImageFile != null)
                {
                    if (!string.IsNullOrEmpty(existSubCategory.ImageUrl))
                    {
                        await _imageHelper.DeleteImage(existSubCategory.ImageUrl);
                    }
                    existSubCategory.ImageUrl = await _imageHelper.AddImage(entity.ImageFile, "sub-categories");
                }

                _context.Update(existSubCategory);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> DeleteListAsync(List<int> categoriesIDs)
        {
            var subCategories = await _context
                .SubCategories
                .Where(c => categoriesIDs.Contains(c.ID))
            .ToListAsync();

            foreach (var category in subCategories)
            {
                if (!string.IsNullOrEmpty(category.ImageUrl))
                {
                    await _imageHelper.DeleteImage(category.ImageUrl);
                }
            }

            _context.RemoveRange(subCategories);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
