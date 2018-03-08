export interface jobInformation{
	id: string;
	occupation: string;
	group: string
}

export interface skillInformation{
	skill_name: string;
	description: string;
	importance: number;
	selected: boolean;
}

export interface gigInformation{
	description: string;
	o_net_cat: string;
	skills: string[];
	title: string;
	url: string;
}