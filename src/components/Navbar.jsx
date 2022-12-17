import { FiMenu } from 'react-icons/fi';
import { ButtonMode, UserMenu} from '.'

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30 shadow-lg dark:bg-black dark:border-black/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Boton hamburguesa */}
            <button
              className="text-slate-500 dark:text-white hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <FiMenu className='w-6 h-6 fill-current'/>
            </button>
          </div>

          {/* Navbar: Parte derecha */}
          <div className="flex items-center">
            <ButtonMode/>
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
              <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
