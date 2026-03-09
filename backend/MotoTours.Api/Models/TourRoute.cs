using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MotoTours.Api.Models;

public enum Difficulty
{
    Easy,
    Medium,
    Hard
}

public class TourRoute
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string StartLocation { get; set; } = string.Empty;
    public string EndLocation { get; set; } = string.Empty;

    public double DistanceKm { get; set; }
    public int DurationMinutes { get; set; }

    [BsonRepresentation(BsonType.String)]
    public Difficulty Difficulty { get; set; } = Difficulty.Easy;

    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}