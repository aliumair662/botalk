-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 17, 2021 at 03:30 PM
-- Server version: 10.3.28-MariaDB-log-cll-lve
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abuddy`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `status`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'user1@email.com', '$2y$10$HTrTlnwj60ciGgBqY6BqkeiMoV0jxc/laxNKQiL/uEvC6y76actDS', 1, 0, '2020-12-10 03:25:07', NULL),
(2, 'aliumair662@gmail.com', '$2y$10$jOm6AmlTwIQvtbf.zB9fd.i8wXEXc4rfODjmqd.Xdpnrqf1umMcvG', 1, 0, '2021-01-02 03:24:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `type_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_time` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `coach_id` int(10) UNSIGNED NOT NULL,
  `file_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `category_id`, `type_id`, `name`, `description`, `start_time`, `end_time`, `notification`, `status`, `is_delete`, `created_at`, `updated_at`, `coach_id`, `file_id`) VALUES
(1, 1, 1, 'PushUp Trainer', 'Hello There', '07:30 AM', '08:00 AM', '1', 1, 0, '2020-11-01 19:19:35', '2020-11-01 19:19:35', 1, 1),
(2, 1, 1, '45 Days Fasting', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour', '2020-10-11', '2020-12-12', '1', 1, 0, '2020-11-22 00:46:59', '2020-11-22 00:46:59', 1, 2),
(3, 2, 1, '20 Days Read a Book', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour', '2020-10-11', '2020-11-11', '1', 1, 0, '2020-11-22 00:48:51', '2020-11-22 00:48:51', 1, 3),
(4, 3, 1, '7 days Football', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour', '2020-10-11', '2020-10-18', '1', 1, 0, '2020-11-22 00:52:45', '2020-11-22 00:52:45', 1, 4),
(5, 1, 1, 'Testing Group', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour', '2020-10-11', '2020-10-18', '1', 1, 0, '2020-11-26 01:00:57', '2020-11-26 01:00:57', 1, 5),
(6, 2, 1, 'med test 1', 'med test 1', '2020/12/27', '2020/12/28', '1', 1, 0, '2020-12-27 18:15:26', '2020-12-27 18:15:26', 5, 6),
(7, 3, 1, 'test', 'test', '2021/01/02', '2021/01/03', '1', 1, 0, '2021-01-02 21:53:11', '2021-01-02 21:53:11', 9, 7),
(8, 2, 1, 'hello meditation', 'hun naa said that i was not a member of the party and was concerned about his actions in his own party and his political views in his own country to be the president in his party of his', '2021/01/06', '2021/01/07', '1', 1, 0, '2021-01-06 18:42:11', '2021-01-06 18:42:11', 10, 8),
(9, 1, 1, 'test gym1', 'test gym 1', '2021/01/11', '2021/01/12', '1', 1, 0, '2021-01-11 22:08:20', '2021-01-11 22:08:20', 9, 9),
(10, 2, 1, 'med test1', 'med test1', '2021/01/11', '2021/01/12', '1', 1, 0, '2021-01-11 22:10:12', '2021-01-11 22:10:12', 9, 10),
(11, 2, 1, 'Challenge 1', 'here is the description', '2021/04/06', '2021/04/07', '1', 1, 0, '2021-04-06 14:48:46', '2021-04-06 14:48:46', 16, 11),
(12, 3, 1, 'udu', 'ulfup', '2021/04/06', '2021/04/07', '1', 1, 0, '2021-04-06 15:33:19', '2021-04-06 15:33:19', 16, 12),
(13, 2, 1, 'Name of chal', 'Des', '2021/04/08', '2021/04/16', '1', 1, 0, '2021-04-08 01:09:42', '2021-04-08 01:09:42', 17, 13);

-- --------------------------------------------------------

--
-- Table structure for table `challenge_categories`
--

CREATE TABLE `challenge_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challenge_categories`
--

INSERT INTO `challenge_categories` (`id`, `name`, `img`, `color`, `status`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Gym', 'http://abuddy.thewebjobs.us/public/category/gym.png', '#FE424F', 1, 0, NULL, NULL),
(2, 'Meditation', 'http://abuddy.thewebjobs.us/public/category/yoga.png', '#755BFB', 1, 0, NULL, NULL),
(3, 'Fitness', 'http://abuddy.thewebjobs.us/public/category/fitness.png', '#FBA14A', 1, 0, NULL, NULL),
(4, 'Others', 'http://abuddy.thewebjobs.us/public/category/fitness.png', '#3BC5FF', 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `challenge_files`
--

CREATE TABLE `challenge_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challenge_files`
--

INSERT INTO `challenge_files` (`id`, `file`, `status`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'http://abuddy.thewebjobs.us/public/challenge/2.png', 1, 0, '2020-11-01 19:19:35', '2020-11-01 19:19:35'),
(2, 'http://abuddy.thewebjobs.us/public/challenge/profile.jpg', 1, 0, '2020-11-22 00:46:59', '2020-11-22 00:46:59'),
(3, 'http://abuddy.thewebjobs.us/public/challenge/profile.jpg', 1, 0, '2020-11-22 00:48:51', '2020-11-22 00:48:51'),
(4, 'http://abuddy.thewebjobs.us/public/challenge/profile.jpg', 1, 0, '2020-11-22 00:52:45', '2020-11-22 00:52:45'),
(5, 'http://abuddy.thewebjobs.us/public/challenge/profile.jpg', 1, 0, '2020-11-26 01:00:57', '2020-11-26 01:00:57'),
(6, 'http://abuddy.thewebjobs.us/public/challenge/Cu.Re Physio App V2.pdf', 1, 0, '2020-12-27 18:15:26', '2020-12-27 18:15:26'),
(7, 'https://abuddy.thewebjobs.us/public/challenge/sample.pdf', 1, 0, '2021-01-02 21:53:11', '2021-01-02 21:53:11'),
(8, 'https://abuddy.thewebjobs.us/public/challenge/Non Plastic Product Exporter,Non Plastic Product Supplier.pdf', 1, 0, '2021-01-06 18:42:11', '2021-01-06 18:42:11'),
(9, 'https://abuddy.thewebjobs.us/public/challenge/dummy.pdf', 1, 0, '2021-01-11 22:08:20', '2021-01-11 22:08:20'),
(10, 'https://abuddy.thewebjobs.us/public/challenge/dummy.pdf', 1, 0, '2021-01-11 22:10:12', '2021-01-11 22:10:12'),
(11, 'https://abuddy.thewebjobs.us/public/challenge/received_1036753036827750.mp4', 1, 0, '2021-04-06 14:48:46', '2021-04-06 14:48:46'),
(12, 'https://abuddy.thewebjobs.us/public/challenge/received_1036753036827750.mp4', 1, 0, '2021-04-06 15:33:19', '2021-04-06 15:33:19'),
(13, 'https://abuddy.thewebjobs.us/public/challenge/SIM_Test Simulator Form 18Dec 1200.pdf', 1, 0, '2021-04-08 01:09:42', '2021-04-08 01:09:42');

-- --------------------------------------------------------

--
-- Table structure for table `challenge_types`
--

CREATE TABLE `challenge_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challenge_types`
--

INSERT INTO `challenge_types` (`id`, `name`, `status`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Daily', 1, 0, NULL, NULL),
(2, 'Weekly', 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `status`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Lahore', 1, 0, NULL, NULL),
(2, 'Karachi', 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coaches`
--

CREATE TABLE `coaches` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `expertise_id` int(10) UNSIGNED NOT NULL,
  `zip_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `img` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plan` int(11) NOT NULL DEFAULT 1,
  `card_brand` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coaches`
--

INSERT INTO `coaches` (`id`, `name`, `password`, `email`, `phone`, `token`, `address`, `city_id`, `expertise_id`, `zip_code`, `bio`, `code`, `status`, `is_delete`, `remember_token`, `created_at`, `updated_at`, `img`, `stripe_id`, `plan`, `card_brand`, `card_last_four`, `trial_ends_at`) VALUES
(1, 'Mudassar Ali', '$2y$10$HTrTlnwj60ciGgBqY6BqkeiMoV0jxc/laxNKQiL/uEvC6y76actDS', 'abbas8156@gmail.com', '4444444444', NULL, 'Lahore', 2, 1, '222', 'There is also Good test', NULL, 1, 0, NULL, '2020-11-01 19:14:21', '2020-12-26 00:48:12', 'http://abuddy.thewebjobs.us/public/profile/coach/profile.jpg', NULL, 1, NULL, NULL, NULL),
(2, 'jzhzhz', '$2y$10$a40ceJRgMtflD..MCJYBreWvYQxUWRLUeJeeFkkcEl9di7Ip66KlW', 'ali@ali.com', '123456', NULL, 'hchbhx x', 2, 1, '165587', 'jndbnx', NULL, 1, 0, NULL, '2020-11-28 02:07:13', '2020-11-28 02:07:13', NULL, NULL, 1, NULL, NULL, NULL),
(3, 'ali', '$2y$10$FmWKc9o7YCLdKuc/GsJq9edOOmQaE3bJyhKUnNI6MNTY7SowKRFae', 'abcde@abc.com', '123456', NULL, 'gshgdh', 2, 1, '1245', 'test', NULL, 1, 0, NULL, '2020-11-28 04:31:17', '2020-11-28 04:31:17', NULL, NULL, 1, NULL, NULL, NULL),
(4, 'talal', '$2y$10$wmi0H.nGS6i5k0svDKVGvO0Jz0TpqrEGhn61A.8MMwewU029vdpBa', 'uzair1080p@gmail.com', '03314782338', NULL, 'zxy', 1, 1, '52250', 'not', NULL, 1, 0, NULL, '2020-11-28 20:34:29', '2020-11-28 20:34:29', NULL, NULL, 1, NULL, NULL, NULL),
(5, 'test9', '$2y$10$BY51iD5C4u2YkfI10n2EJOULZXHSttYrJRDNbzJts5cWv0kByx9O.', 'test9@test9.com', '123456789', NULL, 'test', 0, 1, '12345', 'test', NULL, 1, 0, NULL, '2020-12-27 18:05:59', '2020-12-29 01:12:45', NULL, 'cus_Iela1sTea5kE5H', 2, 'visa', '4242', NULL),
(6, 'usama', '$2y$10$XlOw20.Qp9clr4MHnOt.BexXOs.r.yLaqG2onl1gg/0Vw1b5pUcDK', 'm@gmail.com', '328', NULL, 'cgcc', 1, 1, '655', 'hshsbsbsh', NULL, 1, 0, NULL, '2020-12-30 00:13:56', '2020-12-30 00:13:56', NULL, NULL, 1, NULL, NULL, NULL),
(7, 'aliumair662', '$2y$10$9ZVVRlbz2CA7sxh.IGQ12OiIAKkSH3gqU5zkD3XVpOB.hUXZE/J2K', 'aliumair667@gmail.com', '0321444', NULL, 'mian sansis asddsf', 1, 1, '52250', '11', NULL, 1, 0, NULL, '2020-12-31 01:08:47', '2020-12-31 01:08:47', NULL, NULL, 1, NULL, NULL, NULL),
(8, 'tet9', '$2y$10$JyOJuA0bbhx/8okIrUOs8uCO.jAzuvT1ge1jc1i9mEN0kl.1NfiAC', 'a@a.com', '1234567', NULL, 'hello where are you', 1, 0, '1234567', 'asdasd', NULL, 1, 0, NULL, '2021-01-01 23:00:45', '2021-01-01 23:00:45', NULL, NULL, 1, NULL, NULL, NULL),
(9, 'Test', '$2y$10$iiVVjbnLXLUhzihpNlFoceyA/qsmpZA1wA8btpgqYDzdJKdLxc.na', 'Test10@test10.com', '3227519885', NULL, '12312', 1, 1, '45000', 'wee wee', NULL, 1, 0, NULL, '2021-01-01 23:57:49', '2021-02-15 22:23:58', 'https://abuddy.thewebjobs.us/public/profile/coach/733D37B8-814E-4FD7-B67C-D08A67209BD0.jpg', 'cus_Ix4icTTwB19I8G', 3, 'visa', '4242', NULL),
(10, 'coach', '$2y$10$lQ//jIr0L2vhqHOwisLohe7OxKI0yURdUtdBiHMbSORy3.cCM54sq', 'coach@mail.co', '111111', NULL, 'hello Allah hafiz', 1, 1, '524545', 'I’m a white belt skill set and working as a trainer in', NULL, 1, 0, NULL, '2021-01-06 18:22:39', '2021-01-06 18:28:05', 'https://abuddy.thewebjobs.us/public/profile/coach/58E80AF2-FFBA-4B40-A9D0-F1602E93DD0C.jpg', NULL, 1, NULL, NULL, NULL),
(11, 'Mudassar Abbas', '$2y$10$50Dk3GrHNHVjPR0apwHOAeuC2bCGkMtxykMpQiYPDLCYXOs54ke6q', 'test@test.com', '123456', NULL, 'Judcial Colony', 1, 1, '123', 'Hi there', NULL, 1, 0, NULL, '2021-02-02 21:46:55', '2021-02-02 21:46:55', NULL, NULL, 1, NULL, NULL, NULL),
(12, 'Logan', '$2y$10$8Ob2f/l5ibTbJAaFNLbvNOFfz3slTd5HGush72f0jHb7cz2aMex/.', 'Logan@theappguys.com', '8067813264', NULL, 'test', 0, 1, '19053', 'test bio', NULL, 1, 0, NULL, '2021-02-04 07:56:45', '2021-02-04 07:56:45', NULL, NULL, 1, NULL, NULL, NULL),
(13, 'Austyn Chalifour', '$2y$10$u3dNMpDO/0N340foUDRut.g/bqN6CvrAiC8AEiqSDqsU9LFqNYb72', 'chalifour@theappguys.com', '5862515530', NULL, '20425 Vermander Ave', 0, 0, '48035', 'I’m the best black belt in the world', NULL, 1, 0, NULL, '2021-02-04 18:03:38', '2021-02-04 18:03:38', NULL, NULL, 1, NULL, NULL, NULL),
(14, 'Austyn Chalifour', '$2y$10$7gr1p6z3sPu88489O1WnBe5Gp.LPCWUQo7FLSYgq26aBiaiMNBVTW', 'austynjchalifour@gmail.com', '5862515530', NULL, '20425 Vermander Ave', 0, 0, '48035', 'I help coaches find their true meaning', NULL, 1, 0, NULL, '2021-02-09 21:57:59', '2021-03-02 23:06:36', 'https://abuddy.thewebjobs.us/public/profile/coach/DB5E8861-0BEF-4AF9-A47C-2DA5690F5425.jpg', NULL, 1, NULL, NULL, NULL),
(15, 'Maricela soberanes', '$2y$10$P6GOEiZ/Cu3iqUABe34m5OdTJJvI7S8nPdENWtY7OBmdbwdyL9qKO', 'mkolbeson@yahoo.com', '5125555555', NULL, 'nxhd.', 1, 0, '78701', 'xxfecc', NULL, 1, 0, NULL, '2021-03-21 06:31:23', '2021-03-21 06:31:23', NULL, NULL, 1, NULL, NULL, NULL),
(16, 'Talal', '$2y$10$M3AwnaBmWsUP9gkEI.QfrOs5bZHgsH6yqn76MsnRHOiDDwCSZTQ9q', 'coach@mail.com', '03231613031', NULL, 'address', 1, 1, '24542', 'curujf', NULL, 1, 0, NULL, '2021-04-05 19:41:55', '2021-04-06 15:19:33', 'https://abuddy.thewebjobs.us/public/profile/coach/rn_image_picker_lib_temp_fb4b361a-2cee-4dc5-a50f-344c571da702.jpg', NULL, 1, NULL, NULL, NULL),
(17, 'karna', '$2y$10$0oMoDtemI.6.Gr88bJX6kOfNT4e1Z7zOSQvnPAc/06FsRw3lATUr6', 'karunakaran7415@gmail.com', '8940974348', NULL, 'jgugugugguuggfdfdf', 1, 0, '87878787', 'bio', NULL, 1, 0, NULL, '2021-04-07 20:03:00', '2021-04-07 20:03:00', NULL, NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coach_referrals`
--

CREATE TABLE `coach_referrals` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `coach_id` int(10) UNSIGNED DEFAULT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `approve` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coach_referrals`
--

INSERT INTO `coach_referrals` (`id`, `user_id`, `coach_id`, `challenge_id`, `created_at`, `updated_at`, `approve`) VALUES
(1, 20, 1, 1, '2020-12-25 20:31:21', '2020-12-25 20:31:21', 1),
(2, 21, 1, 1, '2020-12-26 00:32:55', '2020-12-26 00:32:55', 1),
(3, 22, 1, 1, '2020-12-26 00:56:44', '2020-12-26 00:56:44', 0),
(4, 23, 1, 1, '2020-12-26 01:02:25', '2020-12-26 01:02:25', 0),
(5, 24, 1, 1, '2020-12-27 21:52:31', '2020-12-27 21:52:31', 0),
(6, 25, 1, 1, '2020-12-27 22:08:26', '2020-12-27 22:08:26', 0),
(7, 46, 16, 12, '2021-04-06 15:35:26', '2021-04-06 15:35:26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `coach_id` int(10) UNSIGNED DEFAULT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `coach_id`, `challenge_id`, `parent_id`, `body`, `file`, `likes`, `created_at`, `updated_at`) VALUES
(1, NULL, 1, 1, NULL, 'Hello I am Coach', 'http://abuddy.thewebjobs.us/public/comments/profile.jpg', 0, '2020-11-25 00:20:54', '2020-11-27 00:08:21'),
(2, 1, NULL, 1, NULL, 'Hello I am User', 'http://abuddy.thewebjobs.us/public/comments/profile.jpg', 0, '2020-11-26 00:52:17', '2020-11-27 00:08:34'),
(3, 26, NULL, 2, NULL, 'Test', NULL, 0, '2020-12-29 00:50:20', '2020-12-29 00:50:20'),
(4, NULL, 10, 8, NULL, 'I jzhsb', NULL, 0, '2021-01-06 18:48:56', '2021-01-06 18:48:56'),
(5, NULL, 9, 10, NULL, 'Cgnnm', NULL, 0, '2021-01-12 23:13:11', '2021-01-12 23:13:11'),
(6, NULL, 9, 7, NULL, 'Do', NULL, 0, '2021-01-12 23:29:35', '2021-01-12 23:29:35'),
(7, NULL, 9, 7, NULL, 'High  by', NULL, 0, '2021-01-12 23:29:54', '2021-01-12 23:29:54'),
(8, NULL, 9, 7, NULL, 'Bb', NULL, 0, '2021-01-12 23:31:24', '2021-01-12 23:31:24'),
(9, NULL, 9, 7, NULL, 'Tyu', NULL, 0, '2021-01-12 23:33:47', '2021-01-12 23:33:47'),
(10, 26, NULL, 1, NULL, 'Ggkgg', NULL, 0, '2021-01-12 23:52:33', '2021-01-12 23:52:33'),
(11, 26, NULL, 1, NULL, 'Ggy', NULL, 0, '2021-01-12 23:52:38', '2021-01-12 23:52:38'),
(12, 36, NULL, 1, NULL, 'Test', NULL, 0, '2021-02-09 21:55:03', '2021-02-09 21:55:03'),
(13, 38, NULL, 1, NULL, 'Hi', NULL, 0, '2021-02-27 04:40:23', '2021-02-27 04:40:23'),
(14, 38, NULL, 6, NULL, 'Thats hiid', NULL, 0, '2021-02-27 04:43:54', '2021-02-27 04:43:54'),
(15, 41, NULL, 1, NULL, 'Dcvdfv', NULL, 0, '2021-03-11 18:26:28', '2021-03-11 18:26:28'),
(16, NULL, 16, 11, NULL, 'Here is the comment', NULL, 0, '2021-04-06 14:50:36', '2021-04-06 14:50:36'),
(17, 45, NULL, 11, NULL, 'Okah', NULL, 0, '2021-04-06 15:24:10', '2021-04-06 15:24:10'),
(18, NULL, 17, 13, NULL, 'commenting for the first time', NULL, 0, '2021-04-08 01:18:26', '2021-04-08 01:18:26'),
(19, 49, NULL, 2, NULL, 'hiinnkandknaskdnkasnkdandkasnkdankdnaskdnkasndkasnkdnsaklndklasndklasndklasnkdlnsakldnmdskladklsdankdlsnklcdndsklcnklsdc', NULL, 0, '2021-04-14 07:57:12', '2021-04-14 07:57:12'),
(20, 49, NULL, 2, NULL, 'kamndkakldnkladnklamdklamndklamkldamkldmaskldmklasmdklasmdlkasmdlkasmldmasklmdklasmdklasmkldmaskldm', NULL, 0, '2021-04-14 07:57:22', '2021-04-14 07:57:22'),
(21, 49, NULL, 2, NULL, 'dnmkdnkoqndkondkoamkdmkdmaskdmkmdkmdkkdmkodmodmoeiwqjmdoewdop[ewjqo[djewopdjop[ejdop[eqkopdkeopkdopkeqopdkopewkdopkweopdkopkdopekdopkdopekopd', NULL, 0, '2021-04-14 07:57:40', '2021-04-14 07:57:40');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `email`, `subject`, `message`, `created_at`, `updated_at`) VALUES
(1, 'abbas8156@gmail.com', 'Nothing', 'Hello', '2020-11-19 01:10:02', '2020-11-19 01:10:02'),
(2, 'test@test.com', 'test', 'test', '2020-11-19 02:09:41', '2020-11-19 02:09:41'),
(3, 'test1@test1.com', 'test', 'test', '2020-11-19 04:05:07', '2020-11-19 04:05:07'),
(4, 'musamainfo@gmail.com', 'ehhh', 'hdhdvshdbdhebdhdbdhdbdhdhdbdhdhd', '2020-11-26 03:13:12', '2020-11-26 03:13:12'),
(5, 'test@test.com', 'test', 'test', '2020-11-27 01:42:52', '2020-11-27 01:42:52'),
(6, 'musama186@gmail.com', 'test', 'hzbshsbshshe', '2020-11-27 20:29:54', '2020-11-27 20:29:54'),
(7, 'y', 'h', 'h', '2021-01-06 19:13:12', '2021-01-06 19:13:12'),
(8, 'mkolbeson@yahoo.com', 'initial set up', 'when creating a challenge, how many activities is the minimum required.  if has room for 45 i only entered 2 not accepte', '2021-03-21 06:43:14', '2021-03-21 06:43:14'),
(9, 'upplexrentals@gmail.com', 'find a coach', 'my feee access, just finished entering profile, it doesn’t let me pick a coach...I don’t see where to do that.', '2021-03-27 23:01:24', '2021-03-27 23:01:24');

-- --------------------------------------------------------

--
-- Table structure for table `expertises`
--

CREATE TABLE `expertises` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expertises`
--

INSERT INTO `expertises` (`id`, `name`, `status`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Black Belt', 1, 0, NULL, NULL),
(2, 'White Belt', 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `about_service` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whats_wrong` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `coach_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `about_service`, `whats_wrong`, `created_at`, `updated_at`, `coach_id`) VALUES
(1, 1, 'Satisfied', 'Nothing', '2020-11-19 01:09:46', '2020-11-19 01:09:46', NULL),
(2, 1, 'Satisfied', 'Nothing', '2020-11-19 01:55:38', '2020-11-19 01:55:38', NULL),
(3, 1, 'Very Dissatisfied', 'test', '2020-11-19 02:02:44', '2020-11-19 02:02:44', NULL),
(4, 3, 'Dissatisfied', 'test', '2020-11-19 04:04:37', '2020-11-19 04:04:37', NULL),
(5, 3, 'Very Dissatisfied', 'test', '2020-11-20 03:33:45', '2020-11-20 03:33:45', NULL),
(6, 3, 'Very Dissatisfied', 'llojjjjjjjbjbhbbbjnj', '2020-11-26 03:12:25', '2020-11-26 03:12:25', NULL),
(7, 1, 'Satisfied', 'Nothing', '2020-11-27 01:42:34', '2020-11-27 01:42:34', NULL),
(8, 1, 'Very Dissatisfied', 'test', '2020-11-27 01:44:49', '2020-11-27 01:44:49', NULL),
(9, 1, 'Very Satisfied', 'test', '2020-11-28 05:39:15', '2020-11-28 05:39:15', NULL),
(10, 1, 'Very Satisfied', NULL, '2020-11-28 23:47:09', '2020-11-28 23:47:09', NULL),
(11, 1, 'Very Satisfied', NULL, '2020-11-29 03:08:11', '2020-11-29 03:08:11', NULL),
(12, 26, 'Very Satisfied', NULL, '2021-01-01 22:55:29', '2021-01-01 22:55:29', NULL),
(13, 32, 'Very Satisfied', 'yut', '2021-01-06 19:12:58', '2021-01-06 19:12:58', NULL),
(14, 26, 'Dissatisfied', 'test', '2021-01-11 22:48:12', '2021-01-11 22:48:12', 0),
(15, 26, 'Very Satisfied', 'test', '2021-01-11 23:02:07', '2021-01-11 23:02:07', 0),
(16, 0, 'Very Satisfied', 'test', '2021-01-11 23:03:09', '2021-01-11 23:03:09', 9),
(17, 38, 'Dissatisfied', NULL, '2021-02-27 04:36:39', '2021-02-27 04:36:39', 0),
(18, 0, 'Very Satisfied', 'jdjdj', '2021-04-06 15:04:15', '2021-04-06 15:04:15', 16);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2020_10_27_180617_create_challenge_categories_table', 1),
(5, '2020_10_27_181532_create_challenge_types_table', 1),
(6, '2020_10_28_172109_create_challenges_table', 1),
(7, '2020_10_28_172308_create_challenge_files_table', 1),
(8, '2020_10_28_172745_create_tasks_table', 1),
(9, '2020_10_28_172945_create_task_files_table', 1),
(10, '2020_10_29_173038_create_cities_table', 1),
(11, '2020_10_29_173052_create_expertises_table', 1),
(12, '2020_10_29_173107_create_coaches_table', 1),
(13, '2020_10_30_170730_change_city_table', 1),
(14, '2020_10_30_194439_change_challenge_table', 1),
(15, '2020_10_31_183946_change_task_table', 1),
(21, '2020_11_09_172207_create_user_challenge_groups_table', 5),
(18, '2020_11_12_150228_create_tasks_completes_table', 3),
(19, '2020_11_15_125413_create_feedback_table', 4),
(20, '2020_11_15_131914_create_contacts_table', 4),
(22, '2020_11_18_144358_add_image_column_coach_table', 6),
(23, '2020_11_18_144412_add_image_column_user_table', 6),
(24, '2020_11_02_131459_create_admins_table', 7),
(25, '2020_11_21_183404_add_notification_column_user_table', 7),
(27, '2020_11_23_175854_create_comments_table', 8),
(28, '2019_05_03_000001_create_customer_columns', 9),
(29, '2019_05_03_000002_create_subscriptions_table', 9),
(30, '2019_05_03_000003_create_subscription_items_table', 9),
(31, '2020_11_28_172705_create_plans_table', 9),
(32, '2020_12_17_160439_create_coach_referrals_table', 9),
(33, '2020_12_26_180428_add_plan_to_users_table', 10),
(34, '2020_12_26_220713_add_plan_stripe_id_to_coaches_table', 10),
(35, '2020_12_27_101050_add_card_brand_to_coaches_table', 10),
(36, '2020_12_27_103210_add_coach_id_to_subscriptions_table', 10),
(37, '2020_12_27_103621_update_user_id_to_defult_zero_subscriptions_table', 10),
(38, '2020_12_27_111908_update_stipr_id_to_coaches_table', 11),
(39, '2021_01_04_204651_create_notifications_table', 12),
(40, '2021_01_07_201859_add_coach_id_to_feedback_table', 13),
(41, '2021_01_07_213928_create_referrals_earning_table', 13),
(42, '2021_01_13_173205_add_approve_to_coach_referrals_table', 14),
(43, '2021_01_13_194811_add_price_to_plans_table', 14),
(44, '2021_01_25_203748_add_plussigh_to_referrals_earning_table', 15),
(45, '2021_01_25_204930_referrals_earning_withdraw_requests', 15),
(46, '2021_01_29_215355_create_users_referrals_table', 16),
(47, '2021_01_29_223311_add_approve_to_plans_table', 16),
(48, '2021_01_29_230221_add_referral_user_id_to_referrals_earning_table', 16);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `coach_id` int(11) NOT NULL DEFAULT 0,
  `challenge_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `coach_id`, `challenge_id`, `title`, `description`, `type`, `from`, `to`, `status`, `created_at`, `updated_at`) VALUES
(1, 26, 9, 7, 'challenge joined by user', 'challenge test joined by test9@test9.com ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(2, 0, 10, 8, 'new challenge created by coach', 'challenge hello meditation created by coach ', 'challengecreated', 'coach', 'user', 1, NULL, NULL),
(3, 32, 10, 8, 'challenge joined by user', 'challenge hello meditation joined by user ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(4, 0, 9, 9, 'new challenge created by coach', 'challenge test gym1 created by Test ', 'challengecreated', 'coach', 'user', 1, NULL, NULL),
(5, 0, 9, 10, 'new challenge created by coach', 'challenge med test1 created by Test ', 'challengecreated', 'coach', 'user', 1, NULL, NULL),
(6, 26, 10, 8, 'challenge joined by user', 'challenge hello meditation joined by test9@test9.com ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(7, 33, 1, 1, 'challenge joined by user', 'challenge PushUp Trainer joined by test ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(8, 36, 1, 1, 'challenge joined by user', 'challenge PushUp Trainer joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(9, 36, 1, 2, 'challenge joined by user', 'challenge 45 Days Fasting joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(10, 36, 1, 5, 'challenge joined by user', 'challenge Testing Group joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(11, 36, 9, 9, 'challenge joined by user', 'challenge test gym1 joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(12, 37, 1, 1, 'challenge joined by user', 'challenge PushUp Trainer joined by ALi ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(13, 38, 1, 1, 'challenge joined by user', 'challenge PushUp Trainer joined by Talal User ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(14, 38, 5, 6, 'challenge joined by user', 'challenge med test 1 joined by Talal User ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(15, 40, 1, 3, 'challenge joined by user', 'challenge 20 Days Read a Book joined by Talal ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(16, 40, 10, 8, 'challenge joined by user', 'challenge hello meditation joined by Talal ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(17, 41, 1, 1, 'challenge joined by user', 'challenge PushUp Trainer joined by Talal ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(18, 0, 16, 11, 'new challenge created by coach', 'challenge Challenge 1 created by Talal ', 'challengecreated', 'coach', 'user', 1, NULL, NULL),
(19, 45, 16, 11, 'challenge joined by user', 'challenge Challenge 1 joined by user ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(20, 0, 16, 12, 'new challenge created by coach', 'challenge udu created by Talal ', 'challengecreated', 'coach', 'user', 1, NULL, NULL),
(21, 0, 17, 13, 'new challenge created by coach', 'challenge Name of chal created by karna ', 'challengecreated', 'coach', 'user', 1, NULL, NULL),
(22, 49, 1, 1, 'challenge joined by user', 'challenge PushUp Trainer joined by ajith ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(23, 49, 1, 2, 'challenge joined by user', 'challenge 45 Days Fasting joined by ajith ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(24, 49, 1, 3, 'challenge joined by user', 'challenge 20 Days Read a Book joined by ajith ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(25, 49, 1, 5, 'challenge joined by user', 'challenge Testing Group joined by ajith ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(26, 50, 1, 5, 'challenge joined by user', 'challenge Testing Group joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(27, 50, 1, 2, 'challenge joined by user', 'challenge 45 Days Fasting joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(28, 50, 1, 1, 'challenge joined by user', 'challenge PushUp Trainer joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(29, 50, 9, 9, 'challenge joined by user', 'challenge test gym1 joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(30, 50, 16, 12, 'challenge joined by user', 'challenge udu joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(31, 50, 9, 7, 'challenge joined by user', 'challenge test joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(32, 50, 1, 4, 'challenge joined by user', 'challenge 7 days Football joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(33, 50, 1, 3, 'challenge joined by user', 'challenge 20 Days Read a Book joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(34, 50, 5, 6, 'challenge joined by user', 'challenge med test 1 joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(35, 50, 10, 8, 'challenge joined by user', 'challenge hello meditation joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(36, 50, 9, 10, 'challenge joined by user', 'challenge med test1 joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(37, 50, 16, 11, 'challenge joined by user', 'challenge Challenge 1 joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL),
(38, 50, 17, 13, 'challenge joined by user', 'challenge Name of chal joined by Austyn Chalifour ', 'challengejoined', 'admin', 'coach', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `challenges` int(11) NOT NULL DEFAULT 0,
  `invite_friend` int(11) NOT NULL DEFAULT 1,
  `reports` int(11) NOT NULL DEFAULT 1,
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `price` decimal(8,2) NOT NULL DEFAULT 0.00
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `title`, `challenges`, `invite_friend`, `reports`, `identifier`, `stripe_id`, `created_at`, `updated_at`, `price`) VALUES
(1, 'FREE', 7, 1, 1, '', 'price_1I2f0sLaKM8ys1xBL7Pws2Ti', NULL, NULL, 0.00),
(2, 'SMART', 25, 2, 1, '', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', NULL, NULL, 15.00),
(3, 'ADVANCE', 0, 2, 1, '', 'price_1I2fFKLaKM8ys1xBXB76JCIT', NULL, NULL, 29.00);

-- --------------------------------------------------------

--
-- Table structure for table `referrals_earning`
--

CREATE TABLE `referrals_earning` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `coach_id` int(10) UNSIGNED DEFAULT NULL,
  `amount` decimal(8,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '+',
  `referral_user_id` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `referrals_earning`
--

INSERT INTO `referrals_earning` (`id`, `user_id`, `coach_id`, `amount`, `created_at`, `updated_at`, `type`, `referral_user_id`) VALUES
(1, 1, 1, 1.00, '2021-01-08 21:27:15', NULL, '+', 0),
(2, 1, 1, 1.00, '2021-01-08 21:27:15', NULL, '+', 0),
(3, 1, 1, 1.00, '2021-01-08 21:27:15', NULL, '+', 0),
(4, 1, 1, 10.00, '2021-01-06 21:27:15', NULL, '+', 0),
(5, 1, 1, 10.00, '2021-01-01 21:27:15', NULL, '+', 0),
(6, 1, 1, 10.00, '2021-01-01 21:27:15', NULL, '+', 0),
(7, 1, 1, 500.00, '2021-02-01 21:27:15', NULL, '+', 0),
(8, 32, 1, 1.00, '2021-01-08 22:47:11', NULL, '+', 0),
(9, 20, 1, 20.00, '2021-02-16 03:10:47', NULL, '+', 0),
(10, 21, 1, 20.00, '2021-02-16 03:10:55', NULL, '+', 0);

-- --------------------------------------------------------

--
-- Table structure for table `referrals_earning_withdraw_requests`
--

CREATE TABLE `referrals_earning_withdraw_requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `coach_id` int(10) UNSIGNED DEFAULT NULL,
  `paypalemail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(8,2) NOT NULL DEFAULT 0.00,
  `send` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `coach_id` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `user_id`, `name`, `stripe_id`, `stripe_status`, `stripe_plan`, `quantity`, `trial_ends_at`, `ends_at`, `created_at`, `updated_at`, `coach_id`) VALUES
(1, 24, 'default', 'sub_IelHpvpYRxbh9T', 'active', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, NULL, NULL, '2020-12-29 00:52:10', '2020-12-29 00:52:10', 0),
(2, 0, 'default', 'sub_IelcUR6b3vn3R9', 'active', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, NULL, NULL, '2020-12-29 01:12:45', '2020-12-29 01:12:45', 5),
(3, 26, 'default', 'sub_IvawNHmQqOfCHS', 'active', 'price_1I2f0sLaKM8ys1xBL7Pws2Ti', 1, NULL, NULL, '2021-02-11 23:18:40', '2021-02-11 23:18:40', 0),
(4, 26, 'default', 'sub_IvaxsaAp6nnfdA', 'active', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, NULL, NULL, '2021-02-11 23:20:00', '2021-02-11 23:20:00', 0),
(5, 26, 'default', 'sub_Ivb6oLmqWtf2XH', 'active', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, NULL, NULL, '2021-02-11 23:28:42', '2021-02-11 23:28:42', 0),
(6, 0, 'default', 'sub_Ix4irmws32G5lX', 'active', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, NULL, NULL, '2021-02-15 22:08:29', '2021-02-15 22:08:29', 9),
(7, 0, 'default', 'sub_Ix4kaE95kDTZHE', 'active', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, NULL, NULL, '2021-02-15 22:11:16', '2021-02-15 22:11:16', 9),
(8, 0, 'default', 'sub_Ix4v0NbcYB2P7u', 'active', 'price_1I2f0sLaKM8ys1xBL7Pws2Ti', 1, NULL, NULL, '2021-02-15 22:22:09', '2021-02-15 22:22:09', 9),
(9, 0, 'default', 'sub_Ix4x4lqwsM65yx', 'active', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, NULL, NULL, '2021-02-15 22:23:58', '2021-02-15 22:23:58', 9),
(10, 26, 'default', 'sub_Ix4zOajB9N91p7', 'active', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, NULL, NULL, '2021-02-15 22:26:20', '2021-02-15 22:26:20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_items`
--

CREATE TABLE `subscription_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subscription_id` bigint(20) UNSIGNED NOT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_items`
--

INSERT INTO `subscription_items` (`id`, `subscription_id`, `stripe_id`, `stripe_plan`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 'si_IelHRsgNxuo7ff', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, '2020-12-29 00:52:10', '2020-12-29 00:52:10'),
(2, 2, 'si_IelciaS67av9Rb', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, '2020-12-29 01:12:45', '2020-12-29 01:12:45'),
(3, 3, 'si_IvawWhPtxVvAxs', 'price_1I2f0sLaKM8ys1xBL7Pws2Ti', 1, '2021-02-11 23:18:40', '2021-02-11 23:18:40'),
(4, 4, 'si_Ivaxlge8PvYHGt', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, '2021-02-11 23:20:00', '2021-02-11 23:20:00'),
(5, 5, 'si_Ivb6TdzTaZplUd', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, '2021-02-11 23:28:42', '2021-02-11 23:28:42'),
(6, 6, 'si_Ix4i4UAE04kYIF', 'price_1I2f2ELaKM8ys1xBYTjQ0a4v', 1, '2021-02-15 22:08:29', '2021-02-15 22:08:29'),
(7, 7, 'si_Ix4kNp6PnFP0no', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, '2021-02-15 22:11:16', '2021-02-15 22:11:16'),
(8, 8, 'si_Ix4vC906TGdQtV', 'price_1I2f0sLaKM8ys1xBL7Pws2Ti', 1, '2021-02-15 22:22:09', '2021-02-15 22:22:09'),
(9, 9, 'si_Ix4xmeyhEbQARJ', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, '2021-02-15 22:23:58', '2021-02-15 22:23:58'),
(10, 10, 'si_Ix4zzDAJrU1QRq', 'price_1I2fFKLaKM8ys1xBXB76JCIT', 1, '2021-02-15 22:26:20', '2021-02-15 22:26:20');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `coach_id` int(10) UNSIGNED NOT NULL,
  `file_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `challenge_id`, `title`, `description`, `status`, `is_delete`, `created_at`, `updated_at`, `coach_id`, `file_id`) VALUES
(1, 1, 'PushUp Bhai', 'Do these daily', 1, 0, '2020-11-01 19:48:29', '2020-11-01 19:49:10', 1, 1),
(2, 2, 'Fast for 4 Hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:10:54', '2020-11-22 01:10:54', 1, 2),
(3, 2, 'Fast for 2 Hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:11:21', '2020-11-22 01:11:21', 1, 3),
(4, 2, 'Fast for 5 Hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:11:26', '2020-11-22 01:11:26', 1, 4),
(5, 2, 'Fast for 6 Hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:11:31', '2020-11-22 01:11:31', 1, 5),
(6, 2, 'Fast for 7 Hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:11:34', '2020-11-22 01:11:34', 1, 6),
(7, 2, 'Fast for 8 Hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:11:38', '2020-11-22 01:11:38', 1, 7),
(8, 3, 'Read 1st Chapter', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:12:21', '2020-11-22 01:12:21', 1, 8),
(10, 3, 'Read 2nd Chapter', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:13:04', '2020-11-22 01:13:04', 1, 10),
(11, 3, 'Read 3rd Chapter', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:13:16', '2020-11-22 01:13:16', 1, 11),
(12, 4, 'Play 1 hour', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:13:50', '2020-11-22 01:13:50', 1, 12),
(13, 4, 'Play 2 hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:13:55', '2020-11-22 01:13:55', 1, 13),
(14, 4, 'Play 3 hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-22 01:13:59', '2020-11-22 01:13:59', 1, 14),
(15, 4, 'Play 4 hours', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 0, '2020-11-26 01:05:24', '2020-11-26 01:05:24', 1, 15),
(16, 6, 'test1', 'test1', 1, 0, '2020-12-27 18:15:31', '2020-12-27 18:15:31', 5, 16),
(17, 7, 'test', 'test', 1, 0, '2021-01-02 21:53:12', '2021-01-02 21:53:12', 9, 17),
(18, 9, 'test task1', 'test task1', 1, 0, '2021-01-11 22:08:22', '2021-01-11 22:08:22', 9, 18),
(19, 9, 'test task2', 'test task2', 1, 0, '2021-01-11 22:08:23', '2021-01-11 22:08:23', 9, 19),
(20, 10, 'test task1', 'test task1', 1, 0, '2021-01-11 22:10:13', '2021-01-11 22:10:13', 9, 20),
(21, 10, 'test task2', 'test task2', 1, 0, '2021-01-11 22:10:14', '2021-01-11 22:10:14', 9, 21),
(22, 11, 'task 1', 'here write tadk 1', 1, 0, '2021-04-06 14:49:05', '2021-04-06 14:49:05', 16, 22),
(23, 12, 'udu', 'ifi', 1, 0, '2021-04-06 15:33:37', '2021-04-06 15:33:37', 16, 23);

-- --------------------------------------------------------

--
-- Table structure for table `tasks_completes`
--

CREATE TABLE `tasks_completes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks_completes`
--

INSERT INTO `tasks_completes` (`id`, `user_id`, `task_id`, `challenge_id`, `created_at`, `updated_at`) VALUES
(2, 1, 1, 1, '2020-11-18 21:48:36', '2020-11-18 21:48:36'),
(3, 26, 1, 1, '2020-12-29 00:41:53', '2020-12-29 00:41:53'),
(4, 26, 16, 6, '2020-12-29 01:08:45', '2020-12-29 01:08:45'),
(5, 33, 1, 1, '2021-02-03 22:55:17', '2021-02-03 22:55:17'),
(6, 36, 2, 2, '2021-02-09 21:55:12', '2021-02-09 21:55:12'),
(7, 36, 19, 9, '2021-02-09 21:55:51', '2021-02-09 21:55:51'),
(8, 36, 18, 9, '2021-02-09 21:55:55', '2021-02-09 21:55:55'),
(9, 37, 1, 1, '2021-02-24 16:53:18', '2021-02-24 16:53:18'),
(10, 38, 1, 1, '2021-02-27 04:39:37', '2021-02-27 04:39:37'),
(11, 38, 16, 6, '2021-02-27 04:41:05', '2021-02-27 04:41:05'),
(12, 41, 1, 1, '2021-03-11 18:26:11', '2021-03-11 18:26:11'),
(13, 45, 22, 11, '2021-04-06 15:24:46', '2021-04-06 15:24:46'),
(14, 49, 1, 1, '2021-04-12 16:16:50', '2021-04-12 16:16:50');

-- --------------------------------------------------------

--
-- Table structure for table `task_files`
--

CREATE TABLE `task_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_files`
--

INSERT INTO `task_files` (`id`, `file`, `status`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'http://abuddy.thewebjobs.us/public/challenge/task/2.png', 1, 0, '2020-11-01 19:48:29', '2020-11-01 19:48:29'),
(2, 'http://abuddy.thewebjobs.us/public/challenge/task/logo-white.png', 1, 0, '2020-11-22 01:10:54', '2020-11-22 01:10:54'),
(3, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:11:21', '2020-11-22 01:11:21'),
(4, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:11:26', '2020-11-22 01:11:26'),
(5, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:11:31', '2020-11-22 01:11:31'),
(6, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:11:34', '2020-11-22 01:11:34'),
(7, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:11:38', '2020-11-22 01:11:38'),
(8, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:12:21', '2020-11-22 01:12:21'),
(9, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:12:25', '2020-11-22 01:12:25'),
(10, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:13:04', '2020-11-22 01:13:04'),
(11, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:13:16', '2020-11-22 01:13:16'),
(12, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:13:50', '2020-11-22 01:13:50'),
(13, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:13:55', '2020-11-22 01:13:55'),
(14, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-22 01:13:59', '2020-11-22 01:13:59'),
(15, 'http://abuddy.thewebjobs.us/public/challenge/task/profile.jpg', 1, 0, '2020-11-26 01:05:24', '2020-11-26 01:05:24'),
(16, 'http://abuddy.thewebjobs.us/public/challenge/task/Cu.Re Physio App V2.pdf', 1, 0, '2020-12-27 18:15:31', '2020-12-27 18:15:31'),
(17, 'https://abuddy.thewebjobs.us/public/challenge/task/sample.pdf', 1, 0, '2021-01-02 21:53:12', '2021-01-02 21:53:12'),
(18, 'https://abuddy.thewebjobs.us/public/challenge/task/dummy.pdf', 1, 0, '2021-01-11 22:08:22', '2021-01-11 22:08:22'),
(19, 'https://abuddy.thewebjobs.us/public/challenge/task/dummy.pdf', 1, 0, '2021-01-11 22:08:23', '2021-01-11 22:08:23'),
(20, 'https://abuddy.thewebjobs.us/public/challenge/task/dummy.pdf', 1, 0, '2021-01-11 22:10:13', '2021-01-11 22:10:13'),
(21, 'https://abuddy.thewebjobs.us/public/challenge/task/dummy.pdf', 1, 0, '2021-01-11 22:10:14', '2021-01-11 22:10:14'),
(22, 'https://abuddy.thewebjobs.us/public/challenge/task/received_1036753036827750.mp4', 1, 0, '2021-04-06 14:49:04', '2021-04-06 14:49:04'),
(23, 'https://abuddy.thewebjobs.us/public/challenge/task/received_1036753036827750.mp4', 1, 0, '2021-04-06 15:33:37', '2021-04-06 15:33:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `img` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notification` tinyint(4) NOT NULL DEFAULT 1,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_brand` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `plan` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `phone`, `token`, `address`, `code`, `status`, `is_delete`, `remember_token`, `created_at`, `updated_at`, `city_id`, `img`, `notification`, `stripe_id`, `card_brand`, `card_last_four`, `trial_ends_at`, `plan`) VALUES
(1, 'Ali mola', '$2y$10$BY51iD5C4u2YkfI10n2EJOULZXHSttYrJRDNbzJts5cWv0kByx9O.', 'abbas8156@gmail.com', '123456', NULL, 'Judcial Colony', '8305', 1, 0, NULL, '2020-11-09 21:43:14', '2020-12-22 23:18:39', 2, NULL, 1, NULL, NULL, NULL, NULL, 1),
(2, 'test', '$2y$10$AAgecWrEWoSWECRdQ9FCH.NqWdHBNK34IASK1ypzgGsNDUtDIYpBS', 'test@test.com', '1234567890', NULL, 'test', NULL, 1, 0, NULL, '2020-11-19 00:39:28', '2020-11-19 00:39:28', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(3, 'usa', '$2y$10$0cStQhfE2zqlNGqlYY2LnumFR0hZEQghb9i.E7RS/xIEBc5SDRWq2', 'test1@test1.com', '123456', NULL, 'Judcial Colonyghh', NULL, 1, 0, NULL, '2020-11-19 04:03:02', '2020-11-26 03:09:23', 2, NULL, 1, NULL, NULL, NULL, NULL, 1),
(4, 'ALi Tanveer', '$2y$10$dWMGToy2acAT6Ee21Nx2m.PtrklQ7oOxq4u7SvdaHE/cKZi8Zotz6', 'alitanveer458@gmail.com', '123123123', NULL, 'abuse', '5208', 1, 0, NULL, '2020-11-24 02:15:22', '2020-11-29 20:26:50', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(5, 'ali', '$2y$10$ZmU2slqCrMqU/UvCVxDFze12l0RNgF9yLaYHJ8SWpvsIP7CyYewUi', 'a@a.com', '123456789', NULL, 'abcdef', NULL, 1, 0, NULL, '2020-11-24 13:12:51', '2020-11-24 13:12:51', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(6, 'm usama', '$2y$10$SPEoeEHWPkaNfcA.Xs7wiejOjBkNg6rjcmeJnRLvZpGA.5heeFXpa', 'musamainfo@gmail.com', '03235406050', NULL, 'aaalab', NULL, 1, 0, NULL, '2020-11-24 13:20:06', '2020-11-24 13:20:06', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(7, 'talal', '$2y$10$kudDqgk40UFHfLkDxhBG5OMMbv6ai7as4Pc0Dm0vDjUsZknoBJFpS', 'talaltahir789@gmail.com', '12356', NULL, 'qdgy', NULL, 1, 0, NULL, '2020-11-25 00:54:30', '2020-11-25 00:54:30', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(8, 'ali', '$2y$10$wK.gghIWvlBgQw1K4xp6deljv3.UpGd5xmPtB3MITkk5AbsVyN4YG', 'ali@ali.com', '123456', NULL, 'test', NULL, 1, 0, NULL, '2020-11-25 00:57:48', '2020-11-25 00:57:48', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(17, 'usama', '$2y$10$wPZvxXnKNQxatT0dMp6a3ecvxgbVZEdhc40W7I5d6Y.EeRNDGtK5y', 'musaainfo@gmail.com', '12345', NULL, 'wfgh', NULL, 1, 0, NULL, '2020-11-28 23:19:38', '2020-11-28 23:19:38', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(9, 'ali', '$2y$10$Xk/LGTjlUzplzH8ym9IIo.wG7TQjfKmP.SJBGu.aD4sZgMyAiaIr2', 'aligfgg@ali2.com', '123456789', NULL, 'ggvhg', NULL, 1, 0, NULL, '2020-11-28 01:15:19', '2020-11-28 01:15:19', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(10, 'ali', '$2y$10$eL5SFPZhtn1ITL2inEkelOPylPdSwxMfWB9s/9OJNB93PV/YHz.nm', 'a@ali2.com', '123456789', NULL, 'ggghgh', NULL, 1, 0, NULL, '2020-11-28 01:15:51', '2020-11-28 01:15:51', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(11, 'ali', '$2y$10$CaALkqsyeEDdv8M6FJeXYuYeAJWOuDczG811v2SQ5UXc7/tQnONUy', 'a@a3.com', '65565', NULL, 'gvgbh', NULL, 1, 0, NULL, '2020-11-28 01:16:52', '2020-11-28 01:16:52', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(12, 'ali', '$2y$10$IjrSiQBXXoZe5eT31FLeau9FRWLjAjC7FMdj4170WqFpzU0iU4WP6', 'aliseth@a.com', '123456', NULL, 'egcghh', NULL, 1, 0, NULL, '2020-11-28 02:19:31', '2020-11-28 02:19:31', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(13, 'ali', '$2y$10$6xBtMHA1hbcbEY9pnG0ZLeSbKZPlQAbOPBtlF6ApAq6YnPkb920zC', 'abc@abc2.com', '123456789', NULL, 'jshsb', NULL, 1, 0, NULL, '2020-11-28 04:19:05', '2020-11-28 04:19:05', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(14, 'ali', '$2y$10$4sO/YF0ZVLToOnsEvCBUAuuwY2nfGetdhhsWGxamTCiEBpRaLoQFG', 'abcd@abcd.com', '12345', NULL, 'hshsvhxh', NULL, 1, 0, NULL, '2020-11-28 04:24:00', '2020-11-28 04:24:00', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(15, 'ali', '$2y$10$oQwxjcRSdeIYYlMaiGQ/G.MgqM57NkcJqmO5KcneDNemgzfCIYOSm', 'abcde@abc.com', '123456', NULL, 'test', NULL, 1, 0, NULL, '2020-11-28 04:31:58', '2020-11-28 04:31:58', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(16, 'uxair', '$2y$10$HIqC1SXGVL.uSqmMbfq/5OTh9FqylKfC2HeXTkEVbBQdTl/JP/3m2', 'uzair1080p@gmail.com', '03314782338', NULL, 'xyz', NULL, 1, 0, NULL, '2020-11-28 20:28:07', '2020-11-28 20:28:07', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(18, 'usama', '$2y$10$5ik1Hr1LFxuooCqsu.3EruN1mN0LcO3UAZNyOQsIP8BDR4ew/6BC6', 'musama186@gmail.com', '3235406050', NULL, 'yahahahsvsh6', NULL, 1, 0, NULL, '2020-11-29 00:48:57', '2020-11-29 00:48:57', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(19, 'Mudassar Abbas', '$2y$10$MmxBiAytWsOSWBydSu7S8eNzvoRq.tpyKKCXFWXR/mbQ5lzYewXY2', 'mudassar@wewantzoom.com', '123456', NULL, 'Judcial Colony', '4597', 1, 0, NULL, '2020-12-21 22:52:09', '2020-12-21 22:57:04', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(20, 'Mudassar Abbas', '$2y$10$rOeTGHVrJIH8zTrrfR.55OUsqKuijGC4w3cJ7.N3dtuk6asLdIgNW', 'abbas@gmail.com', '123456', NULL, 'Johar', NULL, 1, 0, NULL, NULL, NULL, 2, NULL, 1, NULL, NULL, NULL, NULL, 1),
(21, 'Mudassar', '$2y$10$O091QYTq8QbvZSIzqHkpMu5161KjxWuONMB/arQOsqF1KylZXyaQm', 'user1@email.com', '123456', NULL, 'Johar', NULL, 1, 0, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(22, 'umair ali', '$2y$10$BlIvJL6q60TrXbCvkllaHu4adh/8ugPkEvGDFfF3Cu1eXrQT9IJtW', 'aliumair662@gmail.com', '03227175079', NULL, 'master city\r\n99', NULL, 1, 0, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(23, 'Mudassar', '$2y$10$Tc35Ip7MwRzhwFOvLkWOteuqrW9IHDGiIfDq55gLkq086aIKb/sFO', 'user12@email.com', '123456', NULL, 'johar', NULL, 1, 0, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(24, 'umair ali', '$2y$10$jOm6AmlTwIQvtbf.zB9fd.i8wXEXc4rfODjmqd.Xdpnrqf1umMcvG', 'aliumaur8777@gmail.com', '03227175079', NULL, 'mian sansnd', NULL, 1, 0, NULL, NULL, '2020-12-29 00:52:10', 2, NULL, 1, 'cus_IelHC5TeY8QshA', 'visa', '4242', NULL, 2),
(25, 'Hubgk', '$2y$10$01Dwtk4iaHOD3kcSX7eua.uul0K8sJNiESqIuObY6yxe12ShQUP3C', 'Talaltahir789gy@gmail.com', '03231613031', NULL, 'Bbb', NULL, 1, 0, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(26, 'test9@test9.com', '$2y$10$9jPE1Vp/gTCSK0XSdiRcjO3/p9MbKnpERFpqrCwY9vM0T9AmujrX6', 'test9@test9.com', '123456789', NULL, 'test', NULL, 1, 0, NULL, '2020-12-27 23:18:33', '2021-02-15 22:26:20', 1, 'http://abuddy.thewebjobs.us/public/profile/user/HP-EliteBook-Folio-1040-G1-13.jpg', 1, 'cus_IvawaMvtxWeGZP', 'visa', '4242', NULL, 3),
(27, 'usama', '$2y$10$Qn74JI.tzss999HgjB2BQOZdXRDUviq6CPRY.onoEWhgADrQtGvvO', 'usa@gmail.com', '6494', NULL, 'gshsvssh', NULL, 1, 0, NULL, '2020-12-29 22:15:52', '2020-12-29 22:15:52', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(28, 'usama', '$2y$10$xAIS7nrGhkuGXP.hmW/2Ruj7Tkf1gqyL34Df7errH3QEREmmh1Muy', 'musama6@gmail.com', '555588885', NULL, 'ggggggggg', NULL, 1, 0, NULL, '2020-12-29 23:09:07', '2020-12-29 23:09:07', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(29, 'usama', '$2y$10$/U.O8HlKircOV9WSG8ilxu4roQn6BRUsoargaGgSKAVnYLbWQMb8q', 'mus@gmail.com', '346464', NULL, 'bsbss', NULL, 1, 0, NULL, '2020-12-29 23:40:09', '2020-12-29 23:40:09', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(30, 'test9', '$2y$10$VTnww1xzqhgiJiJqluNYauCDH4txm0fR3vvdXDk0CtvJyocCl.XwS', 'test10@test9.com', '3227519885', NULL, 'test', NULL, 1, 0, NULL, '2021-01-01 02:10:38', '2021-01-01 02:10:38', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(31, 'test9', '$2y$10$Qc.pEoahidKNeizCDtD9S.GUfTjgsVxhPw41VEv21V6aWY05tFCBm', 'test9@test99.com', '123123', NULL, '123123', NULL, 1, 0, NULL, '2021-01-01 22:59:34', '2021-01-01 22:59:34', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(32, 'useru', '$2y$10$cYbrKHyH3EZX93yHSSAgxOfcZA55vGO6Z.hLlGcYGVLfu1jzyFpMq', 'user@mail.com', '12127000', NULL, 'hello bb', NULL, 1, 0, NULL, '2021-01-06 18:55:57', '2021-01-06 19:12:04', 0, 'https://abuddy.thewebjobs.us/public/profile/user/E385BD9B-9B92-4C8D-8D0A-553A3C27A194.png', 1, NULL, NULL, NULL, NULL, 1),
(33, 'test', '$2y$10$SMuCEpoergMpA.4RLxjBPugiJBjSkudJ05TOLhUP604UovFg0L.IC', 'testing@testing.com', '11223344', NULL, 'Testing Please Inre', NULL, 1, 0, NULL, '2021-02-03 22:53:42', '2021-02-03 22:53:42', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(34, 'Logan', '$2y$10$IAAlpXYbbFmmdY.I668uk.FLGbfKCA49nma0B6KDjayfsFVoXNSMm', 'Logan@theappguys.com', '8067813264', NULL, 'hhjj', NULL, 1, 0, NULL, '2021-02-04 08:00:25', '2021-02-04 08:00:25', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(35, 'umair', '$2y$10$lBVOhwZscqXknIu6J7Bm8uihQ2z9QSd2jD1TQbTyQNwXCyFIlFHaO', 'aliumarirefferal@gmail.com', '3227175079', NULL, 'Mian Sansi Shikupora Road', NULL, 1, 0, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(36, 'Austyn Chalifour', '$2y$10$Y8NpzWDIuLQQnLZkcTalA.0mWZfnALgGwK0DRGm9IJ7gEbZhR59mu', 'austynchalifourco@gmail.com', '5862515530', NULL, '20425 Vermander Ave, Clinton Township, MI 48035', NULL, 1, 0, NULL, '2021-02-09 21:51:27', '2021-02-09 21:51:27', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(37, 'ALi', '$2y$10$jStWc59cw2gaDfHm6IxgdOiGT75p4GdFWJYZUJ30K0l1.1Cg8/eCq', 'a2@a2.com', '123123', NULL, '123123', NULL, 1, 0, NULL, '2021-02-24 16:52:41', '2021-02-24 16:52:41', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(38, 'Talal User', '$2y$10$uIv8azczv6UYIOzbNTx/Fu.ZAIyO28ZXlYLxmauT3/RjUakfO65CS', '1user@mail.com', '543487', NULL, 'hello', NULL, 1, 0, NULL, '2021-02-27 04:34:35', '2021-02-27 04:37:42', 1, 'https://abuddy.thewebjobs.us/public/profile/user/0398C033-2841-43D3-8BCB-0C520EEAF644.jpg', 1, NULL, NULL, NULL, NULL, 1),
(39, 'Maricela Soberanes', '$2y$10$iEUD9Snl6S7HfV7SMberk.VTrorJLDaKRLCEKpM5aMUbC3VN6NEAe', 'seedforlifesuccess@gmail.com', '5129009763', NULL, '1401 lavaca st', NULL, 1, 0, NULL, '2021-03-09 09:09:14', '2021-03-09 09:09:14', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(40, 'Talal', '$2y$10$FDM6D4Mv0BeqLeDwNv42Ge1SHbYT63BJDYQiVyGpOZSSHn5PywQNa', 'Talal@mail.com', '03231613031', NULL, 'Gill Road Shoukat Nursery', NULL, 1, 0, NULL, '2021-03-11 18:08:09', '2021-03-11 18:09:06', 1, NULL, 1, 'cus_J60G2sRGvaHRXE', 'visa', '1111', NULL, 1),
(41, 'Talal', '$2y$10$QIlrUho/mCpoOKG0nugsJuSe3889wg58LK6a2L.xQvgV7et23hZxC', 'Talal1@mail.com', '1234321', NULL, 'dxgfxcgvhbjnk', NULL, 1, 0, NULL, '2021-03-11 18:22:16', '2021-03-11 18:22:16', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(42, 'Chris Linger', '$2y$10$ffHNX3lhb7i3uAfyVlmyHO8SQ.KlwmY6TFSuCyiPvSl1JGY1JRWWe', 'upplexrentals@gmail.com', '2406206325', NULL, '1401 Lavaca St 191\nAustin, TX 78701', NULL, 1, 0, NULL, '2021-03-27 22:58:29', '2021-03-27 22:59:17', 1, 'https://abuddy.thewebjobs.us/public/profile/user/3B5454B8-1A2C-479B-A303-1FC8E5C1C743.jpg', 1, NULL, NULL, NULL, NULL, 1),
(43, 'Karna', '$2y$10$a0xc11pHH3SfKUyd6oS1XuTkP.Q4YeCTu2wY5CVpmMadMyhHBlx0C', 'Karunakaran7415@gmail.com', '8940974348', NULL, 'unknown', NULL, 1, 0, NULL, '2021-04-02 06:01:23', '2021-04-02 06:01:23', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(44, 'test', '$2y$10$TVwOxBvRm67Cv67B30Aoeuf05VHjcfVhbuwiZJVucC2FT0pkNsYwS', 'ibadammad@gmail.com', '123123', NULL, 'dfsdfsdfsdf', NULL, 1, 0, NULL, '2021-04-03 16:00:25', '2021-04-03 16:00:25', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(45, 'user', '$2y$10$5SEIgudJiuSkhj9ZGlbXY.8nbXqxlSfhKktg9XxoFGxBzMZmuKfYK', 'user0@mail.com', '9738495', NULL, 'bsbxb', NULL, 1, 0, NULL, '2021-04-06 15:07:24', '2021-04-06 15:10:27', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(46, 'Talal Tahir', '$2y$10$Wq2.coN6yJ.F2Q1u8itFDOSpmv022ij9GgUneNOexcBs35Fb5m7Ra', 'talal@mail.co', '03231613031', NULL, 'Bsbs', NULL, 1, 0, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(47, 'karna', '$2y$10$AdGip24YHzpowK4s9E74KOdWouPmvkYhRu.loEHuA/q46dszpQ7Tm', 'karunakaran741@gmail.com', '8960606867', NULL, 'add', NULL, 1, 0, NULL, '2021-04-07 20:23:46', '2021-04-07 20:23:46', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(48, 'karna', '$2y$10$pf8gv128Qzw97QTkF/yRTe67xJZA3RuISlAN9wJGfAefZ4.I4VZlK', 'karunakaran@gmail.com', '8940939393', NULL, 'empty valuesa', NULL, 1, 0, NULL, '2021-04-10 07:12:27', '2021-04-10 07:12:27', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(49, 'ajith', '$2y$10$eGeyYtmieTyOD2AhOnSyhec6NtXE8WUZ7Pl.R2vyhZAqr7zKvYfp6', 'ajith@gmail.com', '8989898989', NULL, 'add', NULL, 1, 0, NULL, '2021-04-10 07:34:01', '2021-04-10 07:34:01', 1, NULL, 1, NULL, NULL, NULL, NULL, 1),
(50, 'Austyn Chalifour', '$2y$10$vwPJhlsvY8MC0Wpsd7pm1OnY9cHnTuDILK.gcAJpEgUfXvHvfaC7W', 'coachbookapp@gmail.com', '5862515530', NULL, '20425 Vermander Ave', NULL, 1, 0, NULL, '2021-04-13 05:15:20', '2021-04-13 05:15:20', 1, NULL, 1, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_referrals`
--

CREATE TABLE `users_referrals` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `referral_user_id` int(10) UNSIGNED DEFAULT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `approve` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_referrals`
--

INSERT INTO `users_referrals` (`id`, `user_id`, `referral_user_id`, `challenge_id`, `created_at`, `updated_at`, `approve`) VALUES
(1, 35, 3, 1, '2021-02-04 23:09:46', '2021-02-04 23:09:46', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_challenge_groups`
--

CREATE TABLE `user_challenge_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `complete_task_count` int(11) NOT NULL DEFAULT 0,
  `is_leaved` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_challenge_groups`
--

INSERT INTO `user_challenge_groups` (`id`, `user_id`, `challenge_id`, `complete_task_count`, `is_leaved`, `created_at`, `updated_at`) VALUES
(2, 1, 1, 0, 0, '2020-11-19 01:04:21', '2020-11-21 21:23:27'),
(3, 2, 1, 0, 0, '2020-11-19 03:53:04', '2020-11-19 03:58:09'),
(4, 3, 1, 0, 0, '2020-11-19 04:04:18', '2020-11-19 04:04:18'),
(5, 3, 2, 0, 0, '2020-11-24 00:35:24', '2020-11-24 00:35:24'),
(6, 3, 3, 0, 0, '2020-11-24 01:47:02', '2020-11-24 01:47:02'),
(7, 3, 4, 0, 0, '2020-11-24 04:28:52', '2020-11-24 04:28:52'),
(8, 3, 5, 0, 0, '2020-11-26 03:14:19', '2020-11-26 03:14:19'),
(9, 1, 5, 0, 0, '2020-11-28 05:39:33', '2020-11-28 05:39:33'),
(10, 1, 3, 0, 0, '2020-11-28 23:22:45', '2020-11-28 23:22:45'),
(11, 20, 1, 0, 0, '2020-12-25 20:31:21', '2020-12-25 20:31:21'),
(12, 21, 1, 0, 0, '2020-12-26 00:32:55', '2020-12-26 00:32:55'),
(13, 22, 1, 0, 0, '2020-12-26 00:56:44', '2020-12-26 00:56:44'),
(14, 23, 1, 0, 0, '2020-12-26 01:02:25', '2020-12-26 01:02:25'),
(15, 24, 1, 0, 0, '2020-12-27 21:52:31', '2020-12-27 21:52:31'),
(16, 25, 1, 0, 0, '2020-12-27 22:08:26', '2020-12-27 22:08:26'),
(17, 26, 1, 0, 0, '2020-12-27 23:19:07', '2020-12-29 00:42:52'),
(18, 26, 6, 0, 0, '2020-12-27 23:24:21', '2020-12-29 01:00:28'),
(19, 26, 2, 0, 0, '2020-12-29 00:49:37', '2020-12-29 00:49:37'),
(20, 26, 5, 0, 0, '2021-01-01 22:55:50', '2021-01-01 22:55:50'),
(21, 26, 3, 0, 0, '2021-01-01 22:56:01', '2021-01-01 22:56:01'),
(22, 26, 7, 0, 0, '2021-01-05 23:16:32', '2021-01-05 23:16:32'),
(23, 32, 8, 0, 0, '2021-01-06 19:03:41', '2021-01-06 19:03:41'),
(24, 26, 8, 0, 0, '2021-01-11 22:17:13', '2021-01-11 22:17:13'),
(25, 33, 1, 0, 0, '2021-02-03 22:54:02', '2021-02-03 22:54:02'),
(26, 35, 1, 0, 0, '2021-02-04 23:09:46', '2021-02-04 23:09:46'),
(27, 36, 1, 0, 0, '2021-02-09 21:54:12', '2021-02-09 21:54:12'),
(28, 36, 2, 0, 0, '2021-02-09 21:54:16', '2021-02-09 21:54:16'),
(29, 36, 5, 0, 0, '2021-02-09 21:54:18', '2021-02-09 21:54:18'),
(30, 36, 9, 0, 0, '2021-02-09 21:54:20', '2021-02-09 21:54:20'),
(31, 37, 1, 0, 0, '2021-02-24 16:53:01', '2021-02-24 16:53:01'),
(32, 38, 1, 0, 0, '2021-02-27 04:38:53', '2021-02-27 04:38:53'),
(33, 38, 6, 0, 0, '2021-02-27 04:39:20', '2021-02-27 04:39:20'),
(34, 40, 3, 0, 0, '2021-03-11 18:09:53', '2021-03-11 18:09:53'),
(35, 40, 8, 0, 0, '2021-03-11 18:09:57', '2021-03-11 18:09:57'),
(36, 41, 1, 0, 0, '2021-03-11 18:23:51', '2021-03-11 18:23:57'),
(37, 45, 11, 0, 0, '2021-04-06 15:20:19', '2021-04-06 15:20:19'),
(38, 46, 12, 0, 0, '2021-04-06 15:35:26', '2021-04-06 15:35:26'),
(39, 49, 1, 0, 0, '2021-04-10 09:19:10', '2021-04-10 09:19:10'),
(40, 49, 2, 0, 0, '2021-04-10 09:34:13', '2021-04-10 09:34:13'),
(41, 49, 3, 0, 0, '2021-04-10 09:36:01', '2021-04-10 09:36:01'),
(42, 49, 5, 0, 0, '2021-04-12 16:09:38', '2021-04-12 16:09:38'),
(43, 50, 5, 0, 0, '2021-04-13 05:16:51', '2021-04-13 05:16:51'),
(44, 50, 2, 0, 0, '2021-04-13 05:16:54', '2021-04-13 05:16:54'),
(45, 50, 1, 0, 0, '2021-04-13 05:16:56', '2021-04-13 05:16:56'),
(46, 50, 9, 0, 0, '2021-04-13 05:16:58', '2021-04-13 05:16:58'),
(47, 50, 12, 0, 0, '2021-04-13 05:17:06', '2021-04-13 05:17:06'),
(48, 50, 7, 0, 0, '2021-04-13 05:17:08', '2021-04-13 05:17:08'),
(49, 50, 4, 0, 0, '2021-04-13 05:17:10', '2021-04-13 05:17:10'),
(50, 50, 3, 0, 0, '2021-04-13 05:17:16', '2021-04-13 05:17:16'),
(51, 50, 6, 0, 0, '2021-04-13 05:17:18', '2021-04-13 05:17:18'),
(52, 50, 8, 0, 0, '2021-04-13 05:17:19', '2021-04-13 05:17:19'),
(53, 50, 10, 0, 0, '2021-04-13 05:17:22', '2021-04-13 05:17:22'),
(54, 50, 11, 0, 0, '2021-04-13 05:17:24', '2021-04-13 05:17:24'),
(55, 50, 13, 0, 0, '2021-04-13 05:17:26', '2021-04-13 05:17:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenges_category_id_foreign` (`category_id`),
  ADD KEY `challenges_type_id_foreign` (`type_id`),
  ADD KEY `challenges_coach_id_foreign` (`coach_id`),
  ADD KEY `challenges_file_id_foreign` (`file_id`);

--
-- Indexes for table `challenge_categories`
--
ALTER TABLE `challenge_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenge_files`
--
ALTER TABLE `challenge_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenge_types`
--
ALTER TABLE `challenge_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coaches`
--
ALTER TABLE `coaches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coaches_email_unique` (`email`),
  ADD KEY `coaches_city_id_foreign` (`city_id`),
  ADD KEY `coaches_expertise_id_foreign` (`expertise_id`);

--
-- Indexes for table `coach_referrals`
--
ALTER TABLE `coach_referrals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coach_referrals_user_id_foreign` (`user_id`),
  ADD KEY `coach_referrals_coach_id_foreign` (`coach_id`),
  ADD KEY `coach_referrals_challenge_id_foreign` (`challenge_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_challenge_id_foreign` (`challenge_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expertises`
--
ALTER TABLE `expertises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedback_user_id_foreign` (`user_id`),
  ADD KEY `feedback_coach_id_foreign` (`coach_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referrals_earning`
--
ALTER TABLE `referrals_earning`
  ADD PRIMARY KEY (`id`),
  ADD KEY `referrals_earning_user_id_foreign` (`user_id`),
  ADD KEY `referrals_earning_coach_id_foreign` (`coach_id`);

--
-- Indexes for table `referrals_earning_withdraw_requests`
--
ALTER TABLE `referrals_earning_withdraw_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `referrals_earning_withdraw_requests_user_id_foreign` (`user_id`),
  ADD KEY `referrals_earning_withdraw_requests_coach_id_foreign` (`coach_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_stripe_status_index` (`user_id`,`stripe_status`);

--
-- Indexes for table `subscription_items`
--
ALTER TABLE `subscription_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscription_items_subscription_id_stripe_plan_unique` (`subscription_id`,`stripe_plan`),
  ADD KEY `subscription_items_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_challenge_id_foreign` (`challenge_id`),
  ADD KEY `tasks_coach_id_foreign` (`coach_id`),
  ADD KEY `tasks_file_id_foreign` (`file_id`);

--
-- Indexes for table `tasks_completes`
--
ALTER TABLE `tasks_completes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_completes_user_id_foreign` (`user_id`),
  ADD KEY `tasks_completes_task_id_foreign` (`task_id`),
  ADD KEY `tasks_completes_challenge_id_foreign` (`challenge_id`);

--
-- Indexes for table `task_files`
--
ALTER TABLE `task_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_city_id_foreign` (`city_id`),
  ADD KEY `users_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `users_referrals`
--
ALTER TABLE `users_referrals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_challenge_groups`
--
ALTER TABLE `user_challenge_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_challenge_groups_user_id_foreign` (`user_id`),
  ADD KEY `user_challenge_groups_challenge_id_foreign` (`challenge_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `challenge_categories`
--
ALTER TABLE `challenge_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `challenge_files`
--
ALTER TABLE `challenge_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `challenge_types`
--
ALTER TABLE `challenge_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coaches`
--
ALTER TABLE `coaches`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `coach_referrals`
--
ALTER TABLE `coach_referrals`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `expertises`
--
ALTER TABLE `expertises`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `referrals_earning`
--
ALTER TABLE `referrals_earning`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `referrals_earning_withdraw_requests`
--
ALTER TABLE `referrals_earning_withdraw_requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subscription_items`
--
ALTER TABLE `subscription_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tasks_completes`
--
ALTER TABLE `tasks_completes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `task_files`
--
ALTER TABLE `task_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users_referrals`
--
ALTER TABLE `users_referrals`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_challenge_groups`
--
ALTER TABLE `user_challenge_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
