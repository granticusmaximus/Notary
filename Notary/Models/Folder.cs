using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Notary.Models
{
    public class Folder
    {
        [Key]
        public int FolderID { get; set; }
        public string FolderName { get; set; }
        public Note Note { get; set; }
        public List<Note> Notes { get; set; }
    }
}
