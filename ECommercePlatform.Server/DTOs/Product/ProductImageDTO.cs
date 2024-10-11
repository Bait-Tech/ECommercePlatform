namespace ECommercePlatform.Server.DTOs.Product
{
    public class ProductImageDTO
    {
        public int? ID { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsMain { get; set; }
        public bool IsDeleted { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
