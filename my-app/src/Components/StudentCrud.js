import axios from 'axios'
import { useEffect, useState } from 'react'

function StudentCrud() {
    const [id, setId] = useState("");
    const [stname, setName] = useState("");
    const [course, setCourse] = useState("");
    const [students, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    //loading the data
    async function Load() {
        const result = await axios.get("http://localhost:63844/api/Student/GetStudent");
        setUsers(result.data);
        console.log(result.data);
    }

    //insert the data
    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:63844/api/Student/AddStudent", {
                stname: stname,
                course: course
            });
            alert("Student registration successfull");
            setId("");
            setName("");
            setCourse("");
            Load();
        } catch (err) {
            alert(err)
        }
    }

    //code for update student data
    async function editStudent(students) {
        setName(students.stname);
        setCourse(students.course);
        setId(students.id)
    }

    //code for Deleting student data
    async function DeleteStudent(id) {
        await axios.delete("http://localhost:63844/api/Student/DeleteStudent/" + id);
        alert("Student deleted successfully");
        setId("");
        setName("");
        setCourse("");
        Load();
    }

    //update the data
    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch("http://localhost:63844/api/Student/UpdateStudent/" + students.find((u) => u.id === id).id || id,
                {
                    id: id,
                    stname: stname,
                    course: course,
                }
            );
            alert("Student Registration Updated");
            setId("");
            setName("");
            setCourse("");
            Load();
        } catch (err) {
            alert(err);
        }
    }

    return (
        //student form
        <div>
            <h1>Student Details</h1>
            <div className='container mt-4'>
                <form>
                    <div className='form-group'>
                        <input type='text' className='form-control'
                            id='id' hidden value={id}
                            onChange={(event) => {
                                setId(event.target.value);
                            }} />
                        <label>Student Name</label>
                        <div className='form-group'>
                            <input type='text'
                                className='form-control'
                                id='stname'
                                value={stname}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }} />
                        </div>
                        <div className='form-group'>
                            <label>Course</label>
                            <input type='text'
                                className='form-control'
                                id='course'
                                value={course}
                                onChange={(event) => {
                                    setCourse(event.target.value);
                                }} />
                        </div>
                        <div>
                            <button className='btn btn-primary mt-3'
                                onClick={save}>
                                Register
                            </button>
                            <button className='btn btn-success mt-3'
                                onClick={update}>
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='container mt-2'>
                <table className='table table-success table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Student ID</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Option</th>
                        </tr>
                    </thead>
                    {students.map(function fn(student) {
                        return (
                            <tbody>
                                <tr>
                                    <td scope='row'>{student.id}</td>
                                    <td>{student.stname}</td>
                                    <td>{student.course}</td>
                                    <td>
                                        <button type='button' className='btn btn-warning'
                                            onClick={() => editStudent(student)}>Edit</button>
                                        <button type='button' className='btn btn-danger'
                                            onClick={() => DeleteStudent(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}

export default StudentCrud;