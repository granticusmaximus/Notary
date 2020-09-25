using System;
using System.Collections.Generic;
using Notary.Models;

namespace Notary.ViewModel
{
    public class EntryViewModel
    {
        public List<Note> Entries { get; set; }
        public Note Entry { get; set; }
        public string SearchString { get; set; }
    }
}
