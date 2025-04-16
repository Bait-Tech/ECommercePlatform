using ECommercePlatform.Server.DTOs.Product;
using ECommercePlatform.Server.Extensions.pagination;
using ECommercePlatform.Server.Services.Base.Crud;

namespace ECommercePlatform.Server.Services.Main.Product
{
    public interface IProductService : ICrudService<Entities.Main.Product>
    {
        Task<List<ProductDTO>> GetAllProductsAsync();
        Task<ProductDTO> GetByID(int id);
        Task<PaginatedResult<ProductDTO>> GetPaginatedResultAsync(PaginationParams paginationParams);
        Task<List<ProductDTO>> GetProductsByCategory(int categoryID, int? subCategoryID);
        Task<int> InsertAsync(ProductDTO productDto);
        Task<bool> UpdateAsync(ProductDTO productDto);
        Task<bool> DeleteProductAsync(int productId);
        Task<bool> DeleteListAsync(List<int> productIds);
        Task<PaginatedResult<ProductDTO>> FilterProducts(FilterProductsDTO filterProductsDTO);
    }
}