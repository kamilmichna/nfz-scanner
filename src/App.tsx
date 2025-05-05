import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "./components/Layout";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";
import { useAppointments } from "./hooks/useAppointments";
import { SearchParams } from "./types";

function App() {
  const {
    appointments,
    isLoading,
    error,
    searchAppointments,
    sortBy,
    updateSort,
  } = useAppointments();

  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearch, setCurrentSearch] = useState<SearchParams | null>(null);

  const handleSearch = (params: SearchParams) => {
    searchAppointments(params);
    setCurrentSearch(params);
    setHasSearched(true);
  };

  // Generate dynamic SEO title and description based on search state
  const getSeoTitle = () => {
    if (!hasSearched) {
      return "Wyszukiwarka Terminów NFZ - Znajdź najszybszy termin wizyty";
    }
    if (currentSearch) {
      return `Terminy ${currentSearch.specialty} w NFZ ${
        currentSearch.province ? `- ${currentSearch.province}` : ""
      } ${appointments.length ? `(${appointments.length} wizyt)` : ""}`;
    }
    return "Wyniki wyszukiwania - Wyszukiwarka Terminów NFZ";
  };

  const getSeoDescription = () => {
    if (!hasSearched) {
      return "Szybko znajdź najbliższe terminy wizyt w ramach NFZ w całej Polsce. Wyszukuj według specjalizacji, lokalizacji i dostępnych dat.";
    }
    if (currentSearch) {
      return `Znalezione terminy wizyt do ${
        currentSearch.specialty
      } w ramach NFZ${
        currentSearch.province
          ? ` w województwie ${currentSearch.province}`
          : ""
      }. ${
        appointments.length ? `Dostępnych ${appointments.length} terminów.` : ""
      }`;
    }
    return "Wyniki wyszukiwania terminów wizyt w ramach NFZ.";
  };

  return (
    <>
      <Helmet>
        <title>{getSeoTitle()}</title>
        <meta name="description" content={getSeoDescription()} />
        <meta property="og:title" content={getSeoTitle()} />
        <meta property="og:description" content={getSeoDescription()} />
        <meta name="twitter:title" content={getSeoTitle()} />
        <meta name="twitter:description" content={getSeoDescription()} />
        {currentSearch && (
          <meta
            name="keywords"
            content={`NFZ, terminy wizyt, ${currentSearch.specialty}, ${
              currentSearch.province || ""
            }, przychodnie NFZ, lekarze specjaliści`}
          />
        )}
      </Helmet>
      <Layout>
        <div className="max-w-5xl mx-auto">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {hasSearched && (
            <ResultsList
              appointments={appointments}
              isLoading={isLoading}
              error={error}
              sortBy={sortBy}
              onSortChange={updateSort}
            />
          )}

          {!hasSearched && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Jak korzystać z wyszukiwarki?
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <span className="text-blue-800 font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Wybierz specjalizację
                    </h3>
                    <p className="text-gray-600">
                      Wybierz rodzaj lekarza specjalisty, do którego
                      potrzebujesz umówić wizytę
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <span className="text-blue-800 font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Wybierz województwo
                    </h3>
                    <p className="text-gray-600">
                      Wskaż województwo, w którym chcesz znaleźć wizytę
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <span className="text-blue-800 font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Rozszerz wyszukiwanie (opcjonalnie)
                    </h3>
                    <p className="text-gray-600">
                      Możesz zaznaczyć opcję wyszukiwania w sąsiednich
                      województwach, aby zwiększyć szanse na znalezienie
                      wcześniejszego terminu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default App;
