/**
 * Navigation Structure Converter
 * Converts flat navigation data into tree structure
 */

interface RawNavItem {
  nav_no: string;
  nav_parent_no: string;
  nav_name: string;
  link: string;
  type: string;
  sub?: RawNavItem[];
}

interface NavTreeNode {
  id: number;
  title: string;
  type: string;
  path: string;
  children: NavTreeNode[];
}

/**
 * Convert flat navigation data to tree structure
 * @param originalData - Flat navigation data array
 * @returns Tree-structured navigation data
 */
export function convertNavStructure(originalData: RawNavItem[]): NavTreeNode[] {
  const nodeMap = new Map<string, NavTreeNode>();

  // Convert all nodes
  originalData.forEach((item) => {
    nodeMap.set(item.nav_no, {
      id: parseInt(item.nav_no),
      title: item.nav_name,
      type: item.type,
      path: formatPath(item.link),
      children:
        item.sub?.map((subItem) => ({
          id: parseInt(subItem.nav_no),
          title: subItem.nav_name,
          type: subItem.type,
          path: formatPath(subItem.link),
          children: []
        })) || []
    });
  });

  // Build tree structure
  const tree: NavTreeNode[] = [];
  originalData.forEach((item) => {
    const parentNo = item.nav_parent_no;
    const currentNode = nodeMap.get(item.nav_no);

    if (!currentNode) return;

    if (parentNo === '0') {
      tree.push(currentNode);
    } else {
      const parentNode = nodeMap.get(parentNo);
      parentNode?.children.push(currentNode);
    }
  });

  return tree;
}

/**
 * Format navigation path
 * @param link - Raw link string
 * @returns Formatted path
 */
function formatPath(link: string): string {
  if (!link) return '/';

  return link
    .replace(/^\t \//, '/') // Remove fixed prefix
    .replace(/^\/index\.php\//, '/') // Remove fixed prefix
    .replace(/^\/Page\/Index\//, '/') // Remove fixed prefix
    .replace(/(index)?\.html$/i, '') // Handle index.html
    .replace(/\/+$/, '') // Remove trailing slash
    || '/';
}
