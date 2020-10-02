using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Notary.Models;

namespace Notary.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        #region DBSets
        public DbSet<ApplicationUser> ApplicationUser
        {
            get; set;
        }

        public DbSet<Note> Notes
        {
            get; set;

        }

        public DbSet<Folder> Folders
        {
            get; set;

        }
        #endregion

        #region Seed Data
        protected override void OnModelCreating(ModelBuilder builder)
        {
            var hasher = new PasswordHasher<ApplicationUser>();
            base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Email = "gwatson117@gmail.com",
                    FirstName = "Grant",
                    LastName = "Watson",
                    UserName = "gwatson117@gmail.com",
                    NormalizedEmail = "gwatson117@gmail.com",
                    NormalizedUserName = "gwatson117@gmail.com",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    PasswordHash = hasher.HashPassword(null, "Wats#0529"),
                }
            );

        }
        public static string HashPassword(string password)
        {
            byte[] salt;
            byte[] buffer2;
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }
        #endregion
    }
}
