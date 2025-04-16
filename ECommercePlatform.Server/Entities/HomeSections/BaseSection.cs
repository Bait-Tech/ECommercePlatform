namespace ECommercePlatform.Server.Entities.HomeSections
{
    public class BaseSection
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}