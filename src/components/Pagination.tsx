interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}
export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationProps) {
  if (totalPages) {}

  return (
    <div className="flex justify-center gap-2 mt-16">
      <button 
        className="mr-3 flex items-center cursor-pointer text-primary/90 hover:text-primary rounded-xl"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span className="material-icons-outlined !text-3xl">chevron_left</span>
        <span className="text-primary">Back</span>
      </button>
      <div className="space-x-1 space-y-1">
      {[...Array(totalPages).keys()].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1.5 cursor-pointer font-semibold text-primary rounded ${
              currentPage === index + 1 ? 'border-2 border-primary' : ''
            }`}
          >
            {index + 1}
          </button>
      ))}
      </div>
      <button 
        className="ml-3 mr-2 flex items-center cursor-pointer text-primary/90 hover:text-primary rounded-xl"
        onClick={() => {
          if (currentPage < totalPages) handlePageChange(currentPage + 1);
        }}
      >
        <span className="text-primary">Next</span>
        <span className="material-icons-outlined !text-3xl">chevron_right</span>
        
      </button>
    </div>
  );
}