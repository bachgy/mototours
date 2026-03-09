using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MotoTours.Api.Dtos;
using MotoTours.Api.Models;

namespace MotoTours.Api.Services;

public class RoutesService
{
    private readonly IMongoCollection<TourRoute> _routes;

    public RoutesService(IOptions<MongoOptions> mongoOptions)
    {
        var opt = mongoOptions.Value;
        var client = new MongoClient(opt.ConnectionString);
        var db = client.GetDatabase(opt.Database);
        _routes = db.GetCollection<TourRoute>(opt.RoutesCollection);
    }

    public async Task<List<TourRoute>> GetAllAsync(string? q)
    {
        var filter = string.IsNullOrWhiteSpace(q)
            ? Builders<TourRoute>.Filter.Empty
            : Builders<TourRoute>.Filter.Regex(r => r.Name, new MongoDB.Bson.BsonRegularExpression(q, "i"));

        return await _routes.Find(filter).SortByDescending(r => r.CreatedAt).ToListAsync();
    }

    public async Task<TourRoute?> GetByIdAsync(string id)
        => await _routes.Find(r => r.Id == id).FirstOrDefaultAsync();

    public async Task<TourRoute> CreateAsync(RouteCreateUpdateDto dto)
    {
        var route = new TourRoute
        {
            Name = dto.Name,
            StartLocation = dto.StartLocation,
            EndLocation = dto.EndLocation,
            DistanceKm = dto.DistanceKm,
            DurationMinutes = dto.DurationMinutes,
            Difficulty = dto.Difficulty,
            Notes = dto.Notes,
            CreatedAt = DateTime.UtcNow
        };

        await _routes.InsertOneAsync(route);
        return route;
    }

    public async Task<bool> UpdateAsync(string id, RouteCreateUpdateDto dto)
    {
        var update = Builders<TourRoute>.Update
            .Set(r => r.Name, dto.Name)
            .Set(r => r.StartLocation, dto.StartLocation)
            .Set(r => r.EndLocation, dto.EndLocation)
            .Set(r => r.DistanceKm, dto.DistanceKm)
            .Set(r => r.DurationMinutes, dto.DurationMinutes)
            .Set(r => r.Difficulty, dto.Difficulty)
            .Set(r => r.Notes, dto.Notes);

        var result = await _routes.UpdateOneAsync(r => r.Id == id, update);
        return result.MatchedCount == 1;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _routes.DeleteOneAsync(r => r.Id == id);
        return result.DeletedCount == 1;
    }
}