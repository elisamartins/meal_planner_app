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
        //[HttpGet]
        //public async Task<ActionResult<List<User>>> GetUsers()
        //{
        //    Console.WriteLine("getting user");
        //    List<User> users = await _db.Users.AsNoTracking().ToListAsync();

        //    return users;
        //}

        [HttpPost("signin")]
        public async Task<ActionResult> Login([FromBody] User user)
        {
            User foundUser = await _db.Users.Where(user => user.Username == user.Username).FirstOrDefaultAsync();

            if (foundUser == null)
                return BadRequest("User does not exist");

            if (foundUser.Password != user.Password)
                return BadRequest("Wrong password or username");

            else
                return Ok();
        }

        // POST api/<UsersController>
        [HttpPost("signup")]
        public void Post([FromBody] User user)
        {
            _db.Users.Add(new User(user.Username, user.Password));
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
