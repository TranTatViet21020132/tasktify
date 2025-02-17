export const EXPIRED_AT_INTERVAL = 20 * 60 * 1000; 

export const EXPIRED_SHORT_AT_INTERVAL = 10 * 60 * 1000;

export interface ISize {
  deskScale: [number, number, number];
  deskPosition: [number, number, number];
  cubePosition: [number, number, number];
  reactLogoPosition: [number, number, number];
  ringPosition: [number, number, number];
  targetPosition: [number, number, number];
}

export const formatDate = (date: Date | string): string => {
  const dateStr = new Date(date as string);

  const day = String(dateStr.getDate()).padStart(2, '0');
  const month = String(dateStr.getMonth() + 1).padStart(2, '0');
  const year = dateStr.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getDayFromDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayOfWeek[d.getDay()];
};

export const LocaleDate = ({ date, locale = 'en' }: { date: Date | undefined; locale?: string }) => {
  try {
    if (!date || isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const dateFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    const parts = dateFormatter.formatToParts(date);
    const values: { [key: string]: string } = {};
    
    parts.forEach(({ type, value }) => {
      values[type] = value;
    });

    if (locale === 'vi') {
      return `${values.weekday}, ${values.day} ${values.month} ${values.year}`;
    } else {
      return `${values.weekday}, ${values.month} ${values.day} ${values.year}`;
    }
  } catch (error) {
    console.error("Date error:", error);
    return "Invalid Date";
  }
};

export const calculateSizes = (isMobile: boolean, isTablet: boolean): ISize => {
  return {
    deskScale: isMobile ? [0.06, 0.06, 0.06] : [0.055, 0.055, 0.055],
    deskPosition: isTablet ? [0.5, -4.5, 0] : [1.5, -4.5, 0],
    cubePosition: isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [8, 3, 0],
    ringPosition: isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-12, 10, 0],
    targetPosition: isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-10, -9, -10],
  }; 
};
