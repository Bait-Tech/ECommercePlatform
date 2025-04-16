namespace ECommercePlatform.Server.DTOs.HomePageSections
{
    public class HeroSectionImageDTO
    {
        public int ID { get; set; }
        public bool IsMain { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string LinkUrl { get; set; } = string.Empty;
        public IFormFile? ImageFile { get; set; }
    }
}
