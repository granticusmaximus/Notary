using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notary.Data;
using Notary.Models;
using Notary.ViewModel;


namespace Notary.Controllers
{
    public class FolderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FolderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> AddNewFolder(string searchString)
        {
            var folders = from f in _context.Folders
                          select f;

            if (!String.IsNullOrEmpty(searchString))
            {
                folders = folders.Where(s => s.FolderName.Contains(searchString));
            }

            var folderVM = new EntryViewModel
            {
                Folders = await folders.ToListAsync()
            };

            return View(folderVM);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("FolderID,FolderName")] Folder entry)
        {
            if (ModelState.IsValid)
            {
                _context.Add(entry);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(entry);
        }


    }
}