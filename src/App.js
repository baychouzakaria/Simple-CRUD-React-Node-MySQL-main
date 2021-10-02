import './App.css'
import { useState } from 'react'
import Axios from 'axios'

function App() {
  const [name, setName] = useState('')
  const [code, setCode] = useState(0)
  const [description, setDescription] = useState('')
  const [descm, setDescm] = useState('')

  const [employeeList, setEmployeeList] = useState([])
  const [employeesList, setEmployeesList] = useState([])
  const [missionList, setMissionList] = useState([])
  const [missiondList, setMissiondList] = useState([])

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      code: code,
      description: description,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          code: code,
          description: description,
        },
      ])
    })
    window.location.reload()
  }

  const addstarte = () => {
    Axios.post('http://localhost:3001/starte', { descm: descm }).then(() => {
      setMissiondList([
        ...missiondList,
        {
          descm: descm,
        },
      ])
      alert('start !!')
      window.location.reload()
    })
  }

  const addstop = () => {
    Axios.put('http://localhost:3001/stop').then(() => {
      alert('stop !!')
      window.location.reload()
    })
  }

  window.onload = function () {
    getEmployeesa()
    getEmployees()
    getMission()
  }
  const getEmployees = () => {
    Axios.get('http://localhost:3001/article').then((response) => {
      setEmployeeList(response.data)
    })
  }

  const getMission = () => {
    Axios.get('http://localhost:3001/mission').then((response) => {
      setMissionList(response.data)
    })
  }
  const getEmployeesa = () => {
    Axios.get('http://localhost:3001/articles').then((response) => {
      setEmployeesList(response.data)
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id
        }),
      )
    })
  }

  return (
    <div className="App container">
      <div className="information">
        <div className="control">
          <button onClick={addstarte}>start</button>
          <input
            type="text"
            placeholder="Description de la mission"
            onChange={(event) => {
              setDescm(event.target.value)
            }}
          ></input>
          <button onClick={addstop}>stop</button>
        </div>
        <div className="stock">
          <button onClick={getEmployeesa}>Afficher Articles non ajouté</button>
        </div>
        <label>Name:</label>

        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <label>Code:</label>
        <input
          type="text"
          onChange={(event) => {
            setCode(event.target.value)
          }}
        />
        <label>description:</label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        />

        <button onClick={addEmployee}>Ajouter Article</button>
        <button onClick={getEmployees}>Afficher Articles</button>
      </div>
      <div className="employees row justify-content-center ">
        <div className="col-md-6">
          <h1>Articles scanées</h1>
          <div className="employee">
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Num</th>
                  <th scope="col">Name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((val, key) => (
                  <tr className="table-primary">
                    <th scope="row">{key + 1}</th>
                    <td>{val.name}</td>
                    <td>{val.code}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteEmployee(val.id)
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 ">
            <h1>Articles non scanées</h1>
            <div className="employee">
              <div>
                <table className="table table-hover table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Num</th>
                      <th scope="col">Name</th>
                      <th scope="col">Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesList.map((val, key) => (
                      <tr className="table-primary">
                        <th scope="row">{key + 1}</th>
                        <td>{val.names}</td>
                        <td>{val.codes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h1>Mission</h1>
            <div className="employee">
              <div>
                <table className="table table-hover table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Num</th>
                      <th scope="col">ID</th>
                      <th scope="col">Bool</th>
                      <th scope="col">Date</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missionList.map((val, key) => (
                      <tr className="table-primary">
                        <th scope="row">{key + 1}</th>
                        <td>{val.id}</td>
                        <td>{val.bool}</td>
                        <td>{val.date}</td>
                        <td>{val.descm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
