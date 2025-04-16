using ECommercePlatform.Server.Extensions.pagination;

namespace ECommercePlatform.Server.DTOs.Order
{
    public class FilterOrdersDTO
    {
        public PaginationParams? PaginationParams { get; set; }
        public string? UserName { get; set; }
        public bool IsApproved { get; set; }
        public string? PhoneNumber {  get; set; }
    }
}
