using ECommercePlatform.Server.DTOs.Product;
using ECommercePlatform.Server.Services.Base.Crud;

namespace ECommercePlatform.Server.Services.Main.Product
{
    public interface IProductService : ICrudService<Entities.Main.Product>
    {
        Task<int> InsertAsync(ProductDTO productDto);
        Task<int> UpdateAsync(ProductDTO productDto);
        Task<bool> DeleteAsync(int productId);
    }
}
