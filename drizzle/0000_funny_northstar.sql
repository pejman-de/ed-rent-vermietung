CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tonnage` varchar(32),
	`mietdauer` varchar(32),
	`plz` varchar(16),
	`bereitstellung` varchar(32),
	`versicherung` int NOT NULL DEFAULT 0,
	`nachricht` text,
	`vorname` varchar(128),
	`nachname` varchar(128),
	`unternehmen` varchar(256),
	`email` varchar(320),
	`telefon` varchar(64),
	`fileKey` varchar(512),
	`fileUrl` varchar(1024),
	`fileName` varchar(256),
	`offerType` varchar(64),
	`pageVariant` varchar(64),
	`leadScore` int NOT NULL DEFAULT 0,
	`leadCategory` enum('hot','warm','cold') NOT NULL DEFAULT 'cold',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
