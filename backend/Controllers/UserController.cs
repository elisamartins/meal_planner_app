using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly ApplicationDbContext _db;

        public UserController(ApplicationDbContext db)
        {
            _db = db;
        }
        // GET: api/<UsersController>
        [HttpGet("user")]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            Console.WriteLine("getting user");
            List<User> users = await _db.Users.AsNoTracking().ToListAsync();

            return users;
        }

        [HttpGet("user/{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            User user = await _db.Users.Where(user => user.Username == username).FirstOrDefaultAsync();

            if (user == null)
                return BadRequest("User does not exist");

            return user;
        }

        // POST api/<UsersController>
        [HttpPost]
        public void Post([FromBody] string username)
        {
            _db.Users.Add(new User(username, "1234"));
            _db.SaveChanges();
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
