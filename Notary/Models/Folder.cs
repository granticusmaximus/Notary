using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Notary.Models
{
    public class Folder
    {
        [Key]
        public int FolderID { get; set; }
        [Display(Name = "Folder Name")]
        public string FolderName { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
}
