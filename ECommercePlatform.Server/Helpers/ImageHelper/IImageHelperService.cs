namespace ECommercePlatform.Server.Helpers.ImageHelper
{
    public interface IImageHelperService
    {
        Task<string> AddImage(IFormFile Image, string FolderName);
        Task<string> UpdateImage(IFormFile Image, string FolderName);
        Task DeleteImage(string Image);
    }
}
