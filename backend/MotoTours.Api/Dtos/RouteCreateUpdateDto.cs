using MotoTours.Api.Models;

namespace MotoTours.Api.Dtos;

public class RouteCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string StartLocation { get; set; } = string.Empty;
    public string EndLocation { get; set; } = string.Empty;

    public double DistanceKm { get; set; }
    public int DurationMinutes { get; set; }

    public Difficulty Difficulty { get; set; } = Difficulty.Easy;
    public string? Notes { get; set; }
}