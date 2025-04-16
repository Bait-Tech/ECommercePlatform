using ECommercePlatform.Server.DTOs.Product;

namespace ECommercePlatform.Server.DTOs.HomePageSections
{
    public class ProductSectionDTO
    {
        public int? ID { get; set; }
        public string? Title { get; set; }
        public int DisplayOrder { get; set; }
        public int? CategoryID { get; set; }
        public int? SubCategoryID { get; set; }
        public string BadgeText { get; set; } = string.Empty;
        public string BadgeColor { get; set; } = string.Empty;
        public List<ProductDTO> Products { get; set; } = [];
    }
}