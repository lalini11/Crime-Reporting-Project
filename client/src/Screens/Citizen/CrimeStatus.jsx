import { Suspense } from "react";
import { Await, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import Spinner from "../../Components/Spinner";

const CrimeStatus = () => {
  const {crimeStatusData} = useLoaderData(); // Accessing data from loader
  const navigate = useNavigate();

  // if (!crimeStatusData) {
  //   return (
  //     <p className="text-center text-red-500">
  //       {error || "No data available."}
  //     </p>
  //   );
  // }


  console.log(crimeStatusData);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crime Reports</h2>
      <div className="overflow-x-auto">
        <Suspense fallback={<Spinner />}>
          <Await resolve={crimeStatusData}>
            {(reports) => {
              console.log('====================================');
              console.log(reports);
              console.log('====================================');
              return (<table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">Crime ID</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((crime) => (
                      <tr key={crime.crimeId} className="hover:bg-gray-100">
                        <td className="border p-2">{crime.crimeId}</td>
                        <td className="border p-2">{crime.crimeCategory.category}</td>
                        <td className="border p-2">
                          {new Date(crime.crimeDate).toLocaleDateString()}
                        </td>
                        <td className="border p-2">{crime.reportStatus}</td>
                        <td className="border p-2">{crime.description}</td>
                        <td className="border p-2">
                          <button
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                            onClick={() =>
                              navigate(`/citizen/report-details/${crime.crimeId}`)
                            }
                          >
                            See More
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">
                        No crime reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default CrimeStatus;
