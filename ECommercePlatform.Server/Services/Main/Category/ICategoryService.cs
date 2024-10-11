using ECommercePlatform.Server.DTOs.Category;
using ECommercePlatform.Server.Services.Base.Crud;

namespace ECommercePlatform.Server.Services.Main.Category
{
    public interface ICategoryService : ICrudService<Entities.Main.Category>
    {
        Task<int> InsertAsync(CategoryDTO categoryDto);
        Task<bool> UpdateAsync(CategoryDTO categoryDto);
    }
}
