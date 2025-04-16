namespace ECommercePlatform.Server.Services.Cashe
{
    public interface ICasheService
    {
        T GetData<T>(string key);

        bool SetData<T>(string key, T value, DateTimeOffset expirationTime);

        object RemoveData(string key);
    }
}