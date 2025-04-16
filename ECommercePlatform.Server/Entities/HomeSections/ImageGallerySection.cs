namespace ECommercePlatform.Server.Entities.HomeSections
{
    public class ImageGallerySection
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string LinkUrl { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
    }
} 
