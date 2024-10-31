namespace ECommercePlatform.Server.Helpers.ImageHelper
{
    public class ImageHelperService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly string _rootPath;

        public ImageHelperService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _rootPath = Directory.GetCurrentDirectory();
            EnsureDirectoriesExist();

        }
        public async Task<string> AddImage(IFormFile image, string folderName)
        {
            var uploadFolder = EnsureFolderExists(folderName);

            string originalFileName = Path.GetFileNameWithoutExtension(image.FileName);
            string fileExtension = Path.GetExtension(image.FileName);
            string shortenedFileName = originalFileName[..Math.Min(10, originalFileName.Length)];
            string photoName = $"{Guid.NewGuid():N}{shortenedFileName}{fileExtension}";
            var photoRoot = Path.Combine(uploadFolder, photoName);
            using (var fileStream = new FileStream(photoRoot, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }
            return $"/images/{folderName}/{photoName}";

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

        private void EnsureDirectoriesExist()
        {
            var wwwrootPath = Path.Combine(_rootPath, "wwwroot");
            if (!Directory.Exists(wwwrootPath))
            {
                Directory.CreateDirectory(wwwrootPath);
            }

            var imagesPath = Path.Combine(wwwrootPath, "images");
            if (!Directory.Exists(imagesPath))
            {
                Directory.CreateDirectory(imagesPath);
            }
        }
        private string EnsureFolderExists(string folderName)
        {
            var folderPath = Path.Combine(_rootPath, "wwwroot", "images", folderName);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            return folderPath;
        }
    }
}
