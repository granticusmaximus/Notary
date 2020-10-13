using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace Notary.Models
{
    public class Note
    {
        [Key]
        public int ContentID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        [Display(Name = "Date Created")]
        public DateTime DateCreated { get; set; }
        public ApplicationUser AppUser { get; set; }

        [ForeignKey("Folder")]
        public int FolderRefID {get;set;}
        public Folder Folder {get;set;}
    }
}
