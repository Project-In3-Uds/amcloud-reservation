export default function TempStatsLoading() {
  return (
    <div className="space-y-6">
      {/* En-tête skeleton */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="w-64 h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* KPIs skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="w-48 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-6">
              <div className="w-full h-64 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Top routes skeleton */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="w-48 h-5 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div>
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="w-48 h-3 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
