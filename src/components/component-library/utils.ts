
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const filterComponents = (components: any[], searchTerm: string, activeTab: string) => {
  return components.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && component.tags.includes(activeTab.toLowerCase());
  });
};

export const getUniqueTags = (components: any[]) => {
  return Array.from(new Set(components.flatMap(comp => comp.tags)));
};
