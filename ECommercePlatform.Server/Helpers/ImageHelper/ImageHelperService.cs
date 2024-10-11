namespace ECommercePlatform.Server.Helpers.ImageHelper
{
    public class ImageHelperService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImageHelperService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<string> AddImage(IFormFile Image, string FolderName)
        {
            string originalFileName = Path.GetFileNameWithoutExtension(Image.FileName);
            string fileExtension = Path.GetExtension(Image.FileName);
            string shortenedFileName = originalFileName[..Math.Min(10, originalFileName.Length)];
            string photoName = $"{Guid.NewGuid():N}{shortenedFileName}{fileExtension}";
            var photoRoot = Path.Combine(_webHostEnvironment.WebRootPath, "images/" + FolderName + "/", photoName);
            using (var fileStream = new FileStream(photoRoot, FileMode.Create))
            {
                Image.CopyTo(fileStream);
            }
            return $"/images/{FolderName}/{photoName}";

        }

        public async Task<string> UpdateImage(IFormFile Image, string FolderName)
        {
            string originalFileName = Path.GetFileNameWithoutExtension(Image.FileName);
            string fileExtension = Path.GetExtension(Image.FileName);
            string shortenedFileName = originalFileName[..Math.Min(10, originalFileName.Length)];
            string photoName = $"{Guid.NewGuid():N}{shortenedFileName}{fileExtension}";
            var photoRoot = Path.Combine(_webHostEnvironment.WebRootPath, "images/" + FolderName + "/", photoName);
            using (var fileStream = new FileStream(photoRoot, FileMode.Create))
            {
                Image.CopyTo(fileStream);
            }
            return $"/images/{FolderName}/{photoName}";
        }

        public async Task DeleteImage(string Image)
        {

            var existingImagePath = Path.Combine(_webHostEnvironment.WebRootPath, Image.TrimStart('/'));
            if (File.Exists(existingImagePath))
            {
                File.Delete(existingImagePath);
            }

        }
    }
}
