namespace ECommercePlatform.Server.DTOs.Category
{
    public class CategoryDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
