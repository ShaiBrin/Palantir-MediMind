"use client";
import type { NextPage } from 'next';
import HomePageButtons from "./components/ui/HomePageButtons";

const Home: NextPage = () => {
  return (
      <HomePageButtons/>
  );
};

// function Home() {
//   const authenticated = useAuthenticated();
//   if (!authenticated) {
//     return null;
//   }

//   const objectApiNames = Object.keys($Objects);
//   const actionApiNames = Object.keys($Actions);
//   const queryApiNames = Object.keys($Queries);

//   return (
//     <div>
//       <h1>@hospital-osdk/sdk</h1>
//       <p>
//         Welcome to your Ontology SDK! Try using any of the following methods
//         now.
//       </p>
//       <div className={css.methods}>
//         <div>
//           <h2>Objects ({objectApiNames.length})</h2>
//           {objectApiNames.map((objectApiName) => (
//             <pre key={objectApiName}>
//               $Objects.{objectApiName}
//             </pre>
//           ))}
//         </div>
//         <div>
//           <h2>Actions ({actionApiNames.length})</h2>
//           {actionApiNames.map((actionApiName) => (
//             <pre key={actionApiName}>
//               $Actions.{actionApiName}
//             </pre>
//           ))}
//         </div>
//         <div>
//           <h2>Queries ({queryApiNames.length})</h2>
//           {queryApiNames.map((queryApiName) => (
//             <pre key={queryApiName}>
//               $Queries.{queryApiName}
//             </pre>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default Home;
