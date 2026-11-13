
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowUpRight,
  Heart,
  ChevronRight,
  X,
} from 'lucide-react';

import { useHelp } from '@/hooks/useHelp';
import Logo from '@/components/layout/Logo';
import TopicIcon from '@/components/features/TopicIcon';
import { cn } from '@/lib/utils';

interface Props {
  collapsed: boolean;
  toggle: () => void;
  mobile: boolean;
  closeMobile: () => void;
}

export default function Sidebar({
  collapsed,
  toggle,
  mobile,
  closeMobile,
}: Props) {
  const { lang, t, data, categoryName, setChatOpen } = useHelp();

  const showLabels = !collapsed || mobile;

  return (
    <>
      <button
        aria-label="Close navigation"
        className={cn(
          'fixed inset-0 z-40 bg-foreground/30 lg:hidden',
          !mobile && 'hidden',
        )}
        onClick={closeMobile}
      />

      <aside
        className={cn(
          'sidebar fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden',
          'p-4 lg:z-30',
          collapsed ? 'lg:w-[88px]' : 'lg:w-[248px]',
          mobile ? 'w-[268px]' : 'hidden lg:flex',
        )}
      >
        {/* Logo */}
        <div className="relative flex shrink-0 items-center justify-between pb-5">
          <Link
            to={`/${lang}`}
            onClick={closeMobile}
            className="min-w-0"
          >
            <Logo compact={collapsed && !mobile} />
          </Link>

          <button
            onClick={closeMobile}
            aria-label="Close menu"
            className="absolute right-0 top-0 p-2 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable navigation */}
        <nav
          className={cn(
            'sidebar-nav-scroll min-h-0 flex-1 overflow-y-auto',
            'overscroll-contain pb-4',
            collapsed && !mobile ? 'space-y-2' : 'space-y-1',
          )}
        >
          <NavLink
            end
            to={`/${lang}`}
            onClick={closeMobile}
            title={t.home}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-subtle hover:bg-primary/5',
              )
            }
          >
            <Home size={19} className="shrink-0" />
            {showLabels && <span>{t.home}</span>}
          </NavLink>

          {showLabels && (
            <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[.18em] text-subtle">
              {t.browse}
            </p>
          )}

          <div className="space-y-1">
            {data.categories
              .filter((category) => category.published)
              .map((category) => (
                <NavLink
                  key={category.id}
                  to={`/${lang}/category/${category.id}`}
                  onClick={closeMobile}
                  title={categoryName(category)}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-[13px] transition-colors',
                      isActive
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-subtle hover:bg-primary/5',
                      collapsed && !mobile && 'justify-center px-2',
                    )
                  }
                >
                  <TopicIcon
                    name={category.icon}
                    size={18}
                  />

                  {showLabels && (
                    <span className="min-w-0 truncate">
                      {categoryName(category)}
                    </span>
                  )}
                </NavLink>
              ))}
          </div>
        </nav>

        {/* Fixed footer */}
        <div className="mt-3 shrink-0 border-t border-border pt-3">
          {showLabels && (
            <div className="glass mb-3 p-3">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Heart size={15} />
                <span className="text-xs font-semibold">
                  Care comes first
                </span>
              </div>

              <p className="text-xs leading-relaxed text-subtle">
                A little guidance for every part of your Glow journey.
              </p>

              <button
                className="mt-2 flex min-h-9 items-center gap-2 text-xs font-semibold"
                onClick={() => {
                  setChatOpen(true);
                  closeMobile();
                }}
              >
                {t.chat}
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          <a
            href="https://us.dahglow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex min-h-10 items-center gap-3 rounded-xl px-3 text-xs font-semibold hover:bg-primary/5',
              collapsed && !mobile && 'justify-center px-2',
            )}
          >
            <ArrowUpRight size={18} className="shrink-0" />
            {showLabels && t.store}
          </a>

          <button
            onClick={toggle}
            className={cn(
              'mt-2 hidden min-h-10 w-full items-center gap-3 rounded-xl px-3 text-subtle hover:bg-primary/5 lg:flex',
              collapsed && 'justify-center px-2',
            )}
            aria-label={
              collapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
          >
            {collapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}

            {!collapsed && (
              <span className="text-xs">
                Collapse sidebar
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
