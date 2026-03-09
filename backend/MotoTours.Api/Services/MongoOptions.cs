namespace MotoTours.Api.Services;

public class MongoOptions
{
    public string ConnectionString { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string RoutesCollection { get; set; } = "routes";
}