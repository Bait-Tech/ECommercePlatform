namespace ECommercePlatform.Server.Entities.HomeSections
{
    public class GalleryImage
    {
        public int ID { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string LinkUrl { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
    }
}