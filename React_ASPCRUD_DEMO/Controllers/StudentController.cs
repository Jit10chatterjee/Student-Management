using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_ASPCRUD_DEMO.Models;

namespace React_ASPCRUD_DEMO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _studentDbContext;
        public StudentController(StudentDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }

        [HttpGet]
        [Route("GetStudent")]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            return await _studentDbContext.Students.ToListAsync();
        }

        [HttpPost]
        [Route("AddStudent")]
        public async Task<Student> AddStudent(Student objStudent)
        {
            _studentDbContext.Students.Add(objStudent);
            await _studentDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpPatch]
        [Route("UpdateStudent/{id}")]
        public async Task<Student> UpdateStudent(Student objStudent)
        {
            _studentDbContext.Entry(objStudent).State = EntityState.Modified;
            await _studentDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpDelete]
        [Route("DeleteStudent/{id}")]
        public bool DeleteStudent(int id)
        {
            bool a = false;
            var student = _studentDbContext.Students.Find(id);
            if (student != null)
            {
                a = true;
                _studentDbContext.Entry(student).State = EntityState.Deleted;
                _studentDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;

        }
    }
}
