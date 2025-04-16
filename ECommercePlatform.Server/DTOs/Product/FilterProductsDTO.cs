using ECommercePlatform.Server.Extensions.pagination;

namespace ECommercePlatform.Server.DTOs.Product
{
    public class FilterProductsDTO
    {
        public PaginationParams? PaginationParams { get; set; }
        public int CategoryID { get; set; }

        public int? SubCategoryID { get; set; }

        public string Name { get; set; } = string.Empty;
    }
}