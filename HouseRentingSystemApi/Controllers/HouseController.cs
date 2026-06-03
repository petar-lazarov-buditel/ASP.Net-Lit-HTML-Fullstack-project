using HouseRentingSystemApi.Data;
using HouseRentingSystemApi.Data.Entities;
using HouseRentingSystemApi.Models;
using HouseRentingSystemApi.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HouseRentingSystemApi.Controllers
{
    [Route("api/[controller]")]
    public class HouseController : ControllerBase
    {
        private AppDbContext context;

        public HouseController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet("All")]
        [Produces(typeof(IEnumerable<HouseDetailModel>))]
        public async Task<IActionResult> GetAll()
        {
            var model = await context.Houses
                .AsNoTracking()
                .Select(house => new HouseDetailModel()
                {
                    Id = house.Id,
                    Title = house.Title,
                    Address = house.Address,
                    ImageUrl = house.ImageUrl,
                    PricePerMonth = house.PricePerMonth,
                    Category = (CategoryViewEnum)house.CategoryId
                })
                .ToListAsync();

            return Ok(model);
        }

        [HttpGet("{id}")]
        [Produces(typeof(HouseDetailModel))]
        public async Task<IActionResult> GetById(int id)
        {
            var house = await context.Houses.FirstOrDefaultAsync(h => h.Id == id);
            if (house == null)
            {
                return NotFound();
            }

            return Ok(new HouseDetailModel()
            {
                Id = house.Id,
                Title = house.Title,
                Address = house.Address,
                ImageUrl = house.ImageUrl,
                Description = house.Description,
                PricePerMonth = house.PricePerMonth,
                Category = (CategoryViewEnum)house.CategoryId,
                OwnerId = house.OwnerId
            });
        }
        [Authorize]
        [HttpPost]
        [Produces(typeof(HouseDetailModel))]
        public async Task<IActionResult> Create([FromBody] HouseDetailModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var newHouse = new House()
            {
                Description = model.Description,
                PricePerMonth = model.PricePerMonth,
                Address = model.Address,
                Title = model.Title,
                ImageUrl = model.ImageUrl,
                OwnerId = userId
            };

            // 1. Look up category by ID (frontend sends ID)
            var category = await context.Categories
                .FirstOrDefaultAsync(c => c.Id == (int)model.Category);

            // 2. If category does not exist → create it (DO NOT set Id manually)
            if (category == null)
            {
                var newCategory = new Category()
                {
                    Name = model.Category.ToString()
                };

                context.Categories.Add(newCategory);
                await context.SaveChangesAsync();

                newHouse.CategoryId = newCategory.Id;
            }
            else
            {
                newHouse.CategoryId = category.Id;
            }

            // 3. Save the house
            context.Houses.Add(newHouse);
            await context.SaveChangesAsync();

            // 4. Return created result with ID
            return Created($"/api/House/{newHouse.Id}", new HouseDetailModel()
            {
                Id = newHouse.Id,
                Address = newHouse.Address,
                ImageUrl = newHouse.ImageUrl,
                Title = newHouse.Title,
                Description = newHouse.Description,
                PricePerMonth = newHouse.PricePerMonth,
                Category = model.Category,
                OwnerId = newHouse.OwnerId
            });
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await context.Categories
                .Select(c => new { id = c.Id, name = c.Name })
                .ToListAsync();

            return Ok(categories);
        }

        /// <summary>Агент редактира съществуваща къща</summary>
        // [Authorize(Roles = "Agent")]

        [Authorize]
        [HttpPut("{id}")]
        [Produces(typeof(HouseDetailModel))]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] HouseDetailModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var house = await context.Houses.FirstOrDefaultAsync(h => h.Id == id);

            if (house == null)
                return NotFound("Къщата не е намерена.");

            house.Title = model.Title;
            house.Address = model.Address;
            house.ImageUrl = model.ImageUrl;
            house.Description = model.Description;
            house.PricePerMonth = model.PricePerMonth;



            await context.SaveChangesAsync();

            return Ok(new HouseDetailModel
            {
                Id = house.Id,
                Title = house.Title,
                Address = house.Address,
                ImageUrl = house.ImageUrl,
                Description = house.Description,
                PricePerMonth = house.PricePerMonth,
                Category = (CategoryViewEnum)house.CategoryId,
                //IsRented = house.RenterId != null
            });

        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var house = await context.Houses.FirstOrDefaultAsync(h => h.Id == id);

            if (house == null)
                return NotFound("Къщата не е намерена.");

            // Махаме я от базата
            context.Houses.Remove(house);
            await context.SaveChangesAsync();

            // Връщаме модела на изтритата къща
            return Ok(new HouseDetailModel
            {
                Id = house.Id,
                Title = house.Title,
                Address = house.Address,
                ImageUrl = house.ImageUrl,
                Description = house.Description,
                PricePerMonth = house.PricePerMonth,
                Category = (CategoryViewEnum)house.CategoryId
            });
        }
    }
}
