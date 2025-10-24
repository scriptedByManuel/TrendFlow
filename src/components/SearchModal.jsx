import { ArrowRight, Search, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import supabase from '../supabase/supabaseClient';
import { Link } from 'react-router-dom';

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollYRef = useRef(0);

  const clearSearch = () => {
    setQuery('');
    setResult([]);
    onClose();
  };

  // Lock body scroll when modal open
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY || window.pageYOffset;
    scrollYRef.current = scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollYRef.current || 0);
    };
  }, [open]);

  // Fetch products on search
  useEffect(() => {
    if (!query) {
      setResult([]);
      setLoading(false);
      return;
    }

    let mounted = true;
    const handleSearch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url')
        .ilike('name', `%${query}%`)
        .limit(6);

      if (!mounted) return;
      if (error) {
        console.error(error);
        setResult([]);
        setLoading(false);
        return;
      }

      setResult(data || []);
      setLoading(false);
    };

    const timer = setTimeout(handleSearch, 300);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-16 sm:pt-20 z-50">
      <div className="w-full max-w-[660px] max-h-[90vh] bg-white rounded-lg flex flex-col m-4 overflow-hidden">
        {/* Search input */}
        <div className="py-[12px] px-[20px] flex flex-col border-b border-[#E4E4E7]">
          <label
            className="font-montserrat text-secondary text-xs leading-[16px]"
            htmlFor="searchInput"
          >
            Search
          </label>
          <div className="flex items-center gap-[10px]">
            <input
              id="searchInput"
              type="text"
              placeholder='eg. “New Dawn”'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow py-[16px] font-montserrat text-primary text-sm font-medium leading-[20px] outline-none no-autofill-bg"
            />
            <button
              type="button"
              className="w-[36px] h-[36px] p-[12px] bg-[#F4F4F5] flex items-center justify-center rounded-full"
            >
              <Search className="text-secondary" size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search results */}
        <div className="p-4 sm:p-[20px] flex-grow overflow-auto">
          {loading && (
            <p className="font-montserrat text-secondary text-sm">Searching...</p>
          )}
          {!loading && query && (
            <div>
              <h1 className="font-montserrat text-sm font-semibold leading-[20px] mb-4">
                {result.length} Results for “{query}” Products
              </h1>
              <div className="flex flex-col gap-3">
                {result.map((product) => (
                  <div key={product.id} className="pb-3 border-b border-[#E4E4E7] last:border-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-[72px] h-[86px] sm:w-[82px] sm:h-[100px] bg-[#E6E6E6] rounded-lg overflow-hidden">
                          <img className="w-full h-full object-cover" src={product.image_url} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="font-poppins text-sm text-primary font-semibold leading-[100%]">{product.name}</h1>
                          <p className="font-montserrat text-sm text-secondary leading-[140%]">{product.price}</p>
                        </div>
                      </div>
                      <Link onClick={clearSearch} to={`/products/${product.id}`} className="w-[32px] h-[32px] p-2 cursor-pointer flex items-center justify-center bg-[#F4F4F5] rounded-full">
                        <ArrowRight className="text-[#3F3F46]" size={20} strokeWidth={1} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer search value */}
        <div className="p-[20px]">
          <div className="flex items-center justify-between">
            <p className="font-montserrat text-sm text-[#52525B] font-semibold leading-[20px]">
              Search for “{query}”
            </p>
            <X
              className="text-primary cursor-pointer"
              strokeWidth={1.5}
              size={16}
              onClick={clearSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
