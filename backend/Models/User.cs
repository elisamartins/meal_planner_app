using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

public class User
{

    public User(string username, string password)
    {
        Username = username;
        Password = password;
    }

    [Required]
    [StringLength(100)]
    [Key]
    public string Username { get; set; }

    [Required]
    [StringLength(100)]
    public string Password { get; set; }
}