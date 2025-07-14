export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface ActivityCard {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  href?: string;
  disabled?: boolean;
  status?: 'active' | 'completed' | 'upcoming';
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface StudyWeek {
  id: string;
  week: number;
  date: string;
  title: string;
  description: string;
  content: StudyContent[];
  attendance?: {
    present: number;
    total: number;
  };
}

export interface StudyContent {
  icon: string;
  title: string;
  description: string;
  details?: string[];
}

export interface StatItem {
  label: string;
  value: string | number;
  target?: number;
}

export interface Achievement {
  label: string;
  color?: string;
}

export interface TechBadge {
  name: string;
  color?: string;
}

export interface TeamRole {
  name: string;
  count: number;
  icon?: string;
}

export interface ParticleConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: string;
      stroke: {
        width: number;
        color: string;
      };
    };
    opacity: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        opacity_min: number;
        sync: boolean;
      };
    };
    size: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        size_min: number;
        sync: boolean;
      };
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce: boolean;
      attract: {
        enable: boolean;
        rotateX: number;
        rotateY: number;
      };
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      bubble: {
        distance: number;
        size: number;
        duration: number;
        opacity: number;
        speed: number;
      };
      repulse: {
        distance: number;
        duration: number;
      };
      push: {
        particles_nb: number;
      };
      remove: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
} 