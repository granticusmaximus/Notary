using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Notary.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [NotMapped]
        [Display(Name = "Full Name")]
        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }
    }
}
