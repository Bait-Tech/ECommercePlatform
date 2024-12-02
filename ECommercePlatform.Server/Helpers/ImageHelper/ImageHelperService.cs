namespace ECommercePlatform.Server.Helpers.ImageHelper
{
    public class ImageHelperService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly string _rootPath;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ImageHelperService(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
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
            var baseUrl = GetBaseUrl();

            return $"{baseUrl}/images/{folderName}/{photoName}";
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
        public async Task DeleteImage(string imageUrl)
        {
            try
            {
                var baseUrl = GetBaseUrl();
                string relativePath = imageUrl;

                if (imageUrl.StartsWith(baseUrl))
                {
                    relativePath = imageUrl[baseUrl.Length..];
                }

                relativePath = relativePath.TrimStart('/');

                var existingImagePath = Path.Combine(_webHostEnvironment.WebRootPath, relativePath);

                if (File.Exists(existingImagePath))
                {
                    File.Delete(existingImagePath);
                }
                else
                {
                    throw new FileNotFoundException($"Image not found at path: {existingImagePath}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting image: {ex.Message}", ex);
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
        private string GetBaseUrl()
        {
            var request = _httpContextAccessor.HttpContext?.Request;
            return $"{request?.Scheme}://{request?.Host.Value}";
        }
    }
}
