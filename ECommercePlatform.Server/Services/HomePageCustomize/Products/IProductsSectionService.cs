using ECommercePlatform.Server.DTOs.HomePageSections;

namespace ECommercePlatform.Server.Services.HomePageCustomize.Products
{
    public interface IProductsSectionService
    {
        Task<List<ProductSectionDTO>> GetAll();
        Task<int> Insert(ProductSectionDTO model);
        Task<int> Update(ProductSectionDTO model);
        Task<bool> Delete(int sectionID);
    }
}